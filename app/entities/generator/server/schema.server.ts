import { z } from "zod";
import type { GeneratorType } from "../model/types";

const quantity = z.coerce.number().int().min(1).max(50).default(1);

const schemas: Record<GeneratorType, z.ZodType> = {
  password: z.object({
    quantity,
    length: z.coerce.number().int().min(6).max(128).default(20),
    uppercase: z.boolean().default(true),
    lowercase: z.boolean().default(true),
    numbers: z.boolean().default(true),
    symbols: z.boolean().default(true),
  }).refine((value) => value.uppercase || value.lowercase || value.numbers || value.symbols, "Select at least one character set")
    .refine((value) => value.length >= [value.uppercase, value.lowercase, value.numbers, value.symbols].filter(Boolean).length, "Length is too small"),
  number: z.object({
    quantity,
    min: z.coerce.number().int().min(-1_000_000_000).max(1_000_000_000).default(0),
    max: z.coerce.number().int().min(-1_000_000_000).max(1_000_000_000).default(100),
    exclusions: z.array(z.string()).max(1000).default([]),
  }).refine((value) => value.min <= value.max, "Minimum must not exceed maximum")
    .refine((value) => value.max - value.min <= 10_000_000, "Range is too large"),
  vpn: z.object({
    quantity,
    protocol: z.enum(["shadowsocks", "wireguard", "hex"]).default("shadowsocks"),
    length: z.coerce.number().int().min(2).max(256).default(32),
  }),
  uuid: z.object({
    quantity,
    format: z.enum(["standard", "numeric", "alpha", "alphanumeric"]).default("standard"),
    length: z.coerce.number().int().min(2).max(256).default(32),
  }),
  phrase: z.object({
    quantity,
    words: z.coerce.number().refine((value) => [12, 15, 18, 21, 24].includes(value), "Use 12, 15, 18, 21 or 24 words").default(12),
    separator: z.string().min(1).max(4).default(" "),
  }),
  seq: z.object({
    quantity,
    byteLength: z.coerce.number().int().min(2).max(256).default(32),
    encoding: z.enum(["hex", "base64", "base64url"]).default("hex"),
  }),
  "short-id": z.object({
    quantity,
    length: z.coerce.number().int().min(2).max(256).default(8),
  }),
};

export function parseOptions(type: GeneratorType, value: unknown) {
  return schemas[type].parse(value) as Record<string, string | number | boolean | string[]>;
}
