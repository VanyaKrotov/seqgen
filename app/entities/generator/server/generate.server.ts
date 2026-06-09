import { randomBytes, randomInt, randomUUID } from "node:crypto";
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import type { GeneratorType } from "../model/types";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?";
const HEX = "0123456789abcdef";

function pick(alphabet: string) {
  return alphabet[randomInt(0, alphabet.length)];
}

function randomString(length: number, alphabet: string) {
  return Array.from({ length }, () => pick(alphabet)).join("");
}

function shuffle(value: string) {
  const chars = [...value];
  for (let index = chars.length - 1; index > 0; index--) {
    const target = randomInt(0, index + 1);
    [chars[index], chars[target]] = [chars[target], chars[index]];
  }
  return chars.join("");
}

export type GenerateOptions = Record<string, string | number | boolean | string[] | undefined>;

export function generate(type: GeneratorType, options: GenerateOptions): string[] {
  const quantity = Number(options.quantity ?? 1);
  return Array.from({ length: quantity }, () => generateOne(type, options));
}

function generateOne(type: GeneratorType, options: GenerateOptions): string {
  switch (type) {
    case "password": {
      const sets = [
        options.lowercase !== false ? LOWER : "",
        options.uppercase !== false ? UPPER : "",
        options.numbers !== false ? DIGITS : "",
        options.symbols !== false ? SYMBOLS : "",
      ].filter(Boolean);
      const length = Number(options.length ?? 20);
      const required = sets.map(pick).join("");
      return shuffle(required + randomString(length - required.length, sets.join("")));
    }
    case "number": {
      const min = Number(options.min ?? 0);
      const max = Number(options.max ?? 100);
      const excluded = new Set((options.exclusions as string[] | undefined ?? []).map(Number));
      const available = max - min + 1 - [...excluded].filter((value) => value >= min && value <= max).length;
      if (available <= 0) throw new Error("Range contains no available values");
      let value: number;
      do value = randomInt(min, max + 1); while (excluded.has(value));
      return String(value);
    }
    case "vpn": {
      const protocol = String(options.protocol ?? "shadowsocks");
      if (protocol === "wireguard") return randomBytes(32).toString("base64");
      if (protocol === "hex") return randomBytes(32).toString("hex");
      return randomString(Number(options.length ?? 32), LOWER + UPPER + DIGITS + "-_");
    }
    case "uuid": {
      const format = String(options.format ?? "standard");
      if (format === "standard") return randomUUID();
      const alphabet = format === "numeric" ? DIGITS : format === "alpha" ? LOWER + UPPER : LOWER + UPPER + DIGITS;
      return randomString(Number(options.length ?? 32), alphabet);
    }
    case "phrase": {
      const count = Number(options.words ?? 12);
      const separator = String(options.separator ?? " ");
      const strength = (count / 3) * 32;
      return generateMnemonic(wordlist, strength).split(" ").join(separator);
    }
    case "seq": {
      const bytes = randomBytes(Number(options.byteLength ?? 32));
      const encoding = String(options.encoding ?? "hex");
      return encoding === "base64url" ? bytes.toString("base64url") : bytes.toString(encoding === "base64" ? "base64" : "hex");
    }
    case "short-id":
      return randomString(Number(options.length ?? 8), HEX);
  }
}
