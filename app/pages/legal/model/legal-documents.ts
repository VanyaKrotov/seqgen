export type LegalDocumentType = "terms" | "privacy";

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  intro: string;
  sections: LegalSection[];
};

type LegalDocuments = Record<LegalDocumentType, LegalDocument>;

const en: LegalDocuments = {
  terms: {
    intro:
      "These Terms of Use govern access to and use of Seqgen, including its website, generators and API. By using Seqgen, you confirm that you have read and accepted these Terms.",
    sections: [
      {
        title: "1. Service purpose",
        paragraphs: [
          "Seqgen provides tools for generating passwords, numbers, identifiers, mnemonic phrases, byte sequences, VPN credentials and other technical values. The service is intended for lawful personal and professional use.",
          "Generated values are produced from the parameters you provide. Seqgen does not verify whether a result is suitable for a particular system, protocol, security policy or legal requirement.",
        ],
      },
      {
        title: "2. Eligibility and acceptance",
        paragraphs: [
          "You may use Seqgen only if you are legally capable of accepting these Terms. If you use the service on behalf of an organization, you represent that you are authorized to bind that organization.",
        ],
      },
      {
        title: "3. Your responsibilities",
        paragraphs: [
          "You are responsible for reviewing generated values before use and for protecting passwords, keys, recovery phrases and other confidential results.",
        ],
        bullets: [
          "Do not expose generated secrets in public repositories, logs, screenshots or untrusted communication channels.",
          "Keep independent backups where loss of a generated value could block access to data or systems.",
          "Confirm compatibility with the software, protocol and security rules for which the value is intended.",
          "Use appropriate device security, encrypted transport and access controls.",
        ],
      },
      {
        title: "4. Acceptable use",
        paragraphs: [
          "You must not use Seqgen to violate applicable law, infringe third-party rights, disrupt the service or compromise other systems.",
        ],
        bullets: [
          "Do not attempt unauthorized access, vulnerability exploitation or circumvention of technical restrictions.",
          "Do not overload, scrape or automate requests in a way that degrades availability for others.",
          "Do not use generated data to facilitate fraud, abuse, malware, phishing or unauthorized surveillance.",
          "Do not misrepresent Seqgen as providing certification, custody, identity verification or a security guarantee.",
        ],
      },
      {
        title: "5. API use",
        paragraphs: [
          "API access is subject to these Terms and the published API documentation. Endpoints, limits, parameters and response formats may change as the service evolves.",
          "You are responsible for validating responses, handling errors, securing network traffic and applying suitable request limits in your applications.",
        ],
      },
      {
        title: "6. Intellectual property",
        paragraphs: [
          "Seqgen, its interface, branding and original service materials are protected by applicable intellectual-property laws. Generated random values are not claimed as Seqgen property.",
          "Third-party libraries, names and protocols remain subject to their respective licenses and rights.",
        ],
      },
      {
        title: "7. Availability and changes",
        paragraphs: [
          "The service may be modified, suspended or discontinued at any time. Features may be added, removed or limited, including for maintenance, security or operational reasons.",
          "Seqgen does not guarantee uninterrupted availability, permanent storage of local history or compatibility with every browser and external system.",
        ],
      },
      {
        title: "8. Disclaimer",
        paragraphs: [
          "Seqgen is provided on an “as is” and “as available” basis. To the maximum extent permitted by law, no express or implied warranties are made regarding accuracy, fitness for a particular purpose, non-infringement, availability or security.",
          "Cryptographically secure generation reduces predictable randomness but cannot protect secrets after they reach a compromised device, application, clipboard or network.",
        ],
      },
      {
        title: "9. Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, Seqgen and its maintainers are not liable for indirect, incidental, special, consequential or punitive damages, loss of data, credentials, access, revenue or business arising from use of or inability to use the service.",
          "Nothing in these Terms excludes liability that cannot lawfully be excluded.",
        ],
      },
      {
        title: "10. Termination and changes to these Terms",
        paragraphs: [
          "Access may be restricted when use creates legal, security or operational risk or materially violates these Terms. You may stop using the service at any time and remove locally stored data through the history controls or browser settings.",
          "These Terms may be updated when the service or legal requirements change. The date shown at the top identifies the current version. Continued use after an update constitutes acceptance of the revised Terms.",
        ],
      },
    ],
  },
  privacy: {
    intro:
      "This Privacy Policy explains what information Seqgen processes, why it is processed and what choices you have when using the website, generators and API.",
    sections: [
      {
        title: "1. Scope and principles",
        paragraphs: [
          "Seqgen is designed to work without user accounts and to minimize collection of personal data. Information is processed only where needed to provide, secure and maintain the service.",
          "This Policy covers Seqgen itself. External websites, hosting providers and software used with generated values may apply their own privacy terms.",
        ],
      },
      {
        title: "2. Information you provide",
        paragraphs: [
          "Generation requests contain the options you select, such as length, character sets, ranges, exclusions, format, encoding or quantity. These parameters may also appear in the page URL so that the selected configuration can be restored.",
          "Generated results are returned to your browser. Do not place confidential information in URL parameters because URLs may be retained by browser history, network infrastructure or services from which you follow a link.",
        ],
      },
      {
        title: "3. Local browser storage",
        paragraphs: [
          "Seqgen uses IndexedDB in your browser to retain the latest result and up to 20 manually generated history entries for each generator. This data remains on the device and browser profile until you delete it, clear site data or the browser removes it.",
          "The selected language may be stored in localStorage. Local storage improves continuity between visits and is not an account or cloud backup.",
        ],
        bullets: [
          "Delete individual history entries or clear a generator’s history using the controls on the page.",
          "Remove all Seqgen local data through your browser’s site-data settings.",
          "Use private browsing or clear local data after use on a shared device.",
        ],
      },
      {
        title: "4. Server processing",
        paragraphs: [
          "Generation parameters are sent to the Seqgen server API, where the requested value is created and returned. Generated values are not intentionally written to an application database or included in application logs.",
          "As with most web services, infrastructure may process technical data such as IP address, request time, route, response status, user agent and diagnostic information. This data may be needed for delivery, security, abuse prevention and troubleshooting.",
        ],
      },
      {
        title: "5. Cookies and similar technologies",
        paragraphs: [
          "Seqgen does not require advertising or profiling cookies for its core functionality. Browser storage is used for language preferences and generator state as described above.",
          "A hosting or security provider may use strictly necessary technologies to deliver traffic, prevent abuse or maintain a session. Their handling is governed by their applicable terms.",
        ],
      },
      {
        title: "6. Purposes and legal bases",
        paragraphs: [
          "Depending on applicable law, technical information is processed to perform the service you request and for legitimate interests in operating, securing, debugging and improving Seqgen. Where consent is legally required for an optional technology, it will be requested separately.",
        ],
      },
      {
        title: "7. Retention and disclosure",
        paragraphs: [
          "Local generator history remains under your browser’s control. Server and infrastructure logs, if enabled, are retained only for an operationally necessary period under the relevant hosting configuration.",
          "Information may be processed by infrastructure providers acting on behalf of the service, or disclosed where required by law, necessary to protect rights and security, or connected to a transfer of the service. Seqgen does not sell generated values or personal information.",
        ],
      },
      {
        title: "8. Security",
        paragraphs: [
          "Reasonable technical measures are used to protect service traffic and reduce unnecessary retention. No browser, network or storage system can be guaranteed completely secure.",
          "Generated passwords, keys and recovery phrases should be treated as secrets. Your device, clipboard, browser extensions, screenshots, backups and destination application may expose data outside Seqgen’s control.",
        ],
      },
      {
        title: "9. Your choices and rights",
        paragraphs: [
          "You can avoid optional local retention by clearing history and site data. You can also change the language and remove URL parameters before sharing a link.",
          "Depending on your jurisdiction, you may have rights to access, correct, delete, restrict or object to processing of personal data and to lodge a complaint with a supervisory authority. Because Seqgen has no accounts, identifying data related to a particular person may be limited or unavailable.",
        ],
      },
      {
        title: "10. Children, international processing and updates",
        paragraphs: [
          "Seqgen is not directed to children and does not knowingly request personal information from them. If local law requires parental consent, the service may be used only with that consent.",
          "Technical data may be processed in countries where service infrastructure operates. Applicable safeguards depend on the provider and jurisdiction.",
          "This Policy may be updated to reflect changes to the service, storage practices or legal obligations. The date shown at the top identifies the current version.",
        ],
      },
    ],
  },
};

const ru: LegalDocuments = {
  terms: {
    intro:
      "Настоящие Условия использования регулируют доступ к Seqgen и его использование, включая сайт, генераторы и API. Используя Seqgen, вы подтверждаете, что прочитали и приняли эти Условия.",
    sections: [
      {
        title: "1. Назначение сервиса",
        paragraphs: [
          "Seqgen предоставляет инструменты для генерации паролей, чисел, идентификаторов, мнемонических фраз, последовательностей байтов, данных для VPN и других технических значений. Сервис предназначен для законного личного и профессионального использования.",
          "Значения создаются на основе заданных вами параметров. Seqgen не проверяет пригодность результата для конкретной системы, протокола, политики безопасности или требований законодательства.",
        ],
      },
      {
        title: "2. Право на использование и принятие условий",
        paragraphs: [
          "Вы можете пользоваться Seqgen, только если вправе принять настоящие Условия. Используя сервис от имени организации, вы подтверждаете наличие полномочий действовать от её имени.",
        ],
      },
      {
        title: "3. Ответственность пользователя",
        paragraphs: [
          "Вы самостоятельно проверяете сгенерированные значения перед использованием и обеспечиваете защиту паролей, ключей, фраз восстановления и других конфиденциальных результатов.",
        ],
        bullets: [
          "Не публикуйте секреты в открытых репозиториях, логах, снимках экрана и недоверенных каналах связи.",
          "Создавайте независимые резервные копии, если потеря значения может привести к утрате доступа к данным или системам.",
          "Проверяйте совместимость с программой, протоколом и правилами безопасности, для которых предназначен результат.",
          "Используйте защищённое устройство, шифрование при передаче и надлежащий контроль доступа.",
        ],
      },
      {
        title: "4. Допустимое использование",
        paragraphs: [
          "Запрещено использовать Seqgen для нарушения закона, прав третьих лиц, работы сервиса или безопасности чужих систем.",
        ],
        bullets: [
          "Не пытайтесь получить несанкционированный доступ, использовать уязвимости или обходить технические ограничения.",
          "Не перегружайте сервис и не автоматизируйте запросы способом, ухудшающим его доступность для других.",
          "Не используйте результаты для мошенничества, вредоносного ПО, фишинга, злоупотреблений или незаконного наблюдения.",
          "Не представляйте Seqgen как средство сертификации, хранения активов, проверки личности или гарантию безопасности.",
        ],
      },
      {
        title: "5. Использование API",
        paragraphs: [
          "Использование API регулируется настоящими Условиями и опубликованной документацией. Endpoints, ограничения, параметры и форматы ответов могут изменяться по мере развития сервиса.",
          "Вы отвечаете за проверку ответов, обработку ошибок, защиту сетевого соединения и разумное ограничение частоты запросов в своих приложениях.",
        ],
      },
      {
        title: "6. Интеллектуальная собственность",
        paragraphs: [
          "Seqgen, его интерфейс, фирменные элементы и оригинальные материалы защищены применимым законодательством об интеллектуальной собственности. Seqgen не заявляет права собственности на случайно сгенерированные значения.",
          "Сторонние библиотеки, названия и протоколы регулируются собственными лицензиями и правами.",
        ],
      },
      {
        title: "7. Доступность и изменения",
        paragraphs: [
          "Сервис может быть изменён, временно приостановлен или прекращён в любое время. Функции могут добавляться, удаляться или ограничиваться, в том числе по техническим причинам и причинам безопасности.",
          "Seqgen не гарантирует непрерывную доступность, постоянное хранение локальной истории или совместимость со всеми браузерами и внешними системами.",
        ],
      },
      {
        title: "8. Отказ от гарантий",
        paragraphs: [
          "Seqgen предоставляется «как есть» и «по мере доступности». В максимально допустимой законом степени не предоставляются явные или подразумеваемые гарантии точности, пригодности для конкретной цели, доступности, безопасности и отсутствия нарушений прав.",
          "Криптографически стойкая генерация снижает предсказуемость результата, но не защищает секрет после его попадания на скомпрометированное устройство, в приложение, буфер обмена или сеть.",
        ],
      },
      {
        title: "9. Ограничение ответственности",
        paragraphs: [
          "В максимально допустимой законом степени Seqgen и его разработчики не отвечают за косвенные, случайные, специальные или последующие убытки, потерю данных, учётных данных, доступа, дохода или бизнеса в связи с использованием либо невозможностью использования сервиса.",
          "Настоящие Условия не исключают ответственность, которую нельзя исключить по закону.",
        ],
      },
      {
        title: "10. Прекращение доступа и изменение условий",
        paragraphs: [
          "Доступ может быть ограничен, если использование создаёт юридический, технический или операционный риск либо существенно нарушает настоящие Условия. Вы можете прекратить использование в любое время и удалить локальные данные через элементы управления историей или настройки браузера.",
          "Условия могут обновляться при изменении сервиса или требований законодательства. Дата в верхней части страницы обозначает актуальную редакцию. Продолжение использования после обновления означает принятие новой редакции.",
        ],
      },
    ],
  },
  privacy: {
    intro:
      "Настоящая Политика конфиденциальности объясняет, какие сведения обрабатывает Seqgen, зачем это необходимо и какие возможности управления данными доступны при использовании сайта, генераторов и API.",
    sections: [
      {
        title: "1. Область действия и основные принципы",
        paragraphs: [
          "Seqgen работает без учётных записей и спроектирован с целью минимизации сбора персональных данных. Информация обрабатывается только в объёме, необходимом для предоставления, защиты и поддержки сервиса.",
          "Политика распространяется на Seqgen. Внешние сайты, хостинг-провайдеры и программы, в которых используются результаты генерации, могут применять собственные правила конфиденциальности.",
        ],
      },
      {
        title: "2. Данные, которые вы передаёте",
        paragraphs: [
          "Запрос генерации содержит выбранные параметры: длину, наборы символов, диапазоны, исключения, формат, кодировку или количество. Параметры могут находиться в URL страницы, чтобы выбранная конфигурация могла быть восстановлена.",
          "Результат генерации возвращается в браузер. Не помещайте конфиденциальную информацию в параметры URL: адрес может сохраняться в истории браузера, сетевой инфраструктуре или на сайте, с которого был выполнен переход.",
        ],
      },
      {
        title: "3. Локальное хранилище браузера",
        paragraphs: [
          "Seqgen использует IndexedDB для сохранения последнего результата и не более 20 записей ручной генерации для каждого генератора. Данные остаются на устройстве и в профиле браузера, пока вы не удалите их, не очистите данные сайта или браузер не удалит их самостоятельно.",
          "Выбранный язык может сохраняться в localStorage. Локальное хранилище обеспечивает удобство между посещениями, но не является учётной записью или облачной резервной копией.",
        ],
        bullets: [
          "Удаляйте отдельные записи или очищайте историю генератора с помощью элементов управления на странице.",
          "Удаляйте все локальные данные Seqgen через настройки данных сайтов в браузере.",
          "Используйте приватный режим или очищайте локальные данные после работы на общем устройстве.",
        ],
      },
      {
        title: "4. Обработка на сервере",
        paragraphs: [
          "Параметры генерации отправляются в API Seqgen, где создаётся и возвращается запрошенное значение. Результаты намеренно не записываются в базу данных приложения и не должны включаться в прикладные логи.",
          "Как и у большинства веб-сервисов, инфраструктура может обрабатывать технические данные: IP-адрес, время запроса, маршрут, статус ответа, user agent и диагностическую информацию. Это может быть необходимо для доставки контента, безопасности, предотвращения злоупотреблений и устранения ошибок.",
        ],
      },
      {
        title: "5. Cookies и аналогичные технологии",
        paragraphs: [
          "Для основной работы Seqgen не требуются рекламные или профилирующие cookies. Хранилище браузера используется для языковых настроек и состояния генераторов, как описано выше.",
          "Хостинг-провайдер или сервис безопасности может применять строго необходимые технологии для передачи трафика, защиты от злоупотреблений или поддержки сессии. Такая обработка регулируется условиями соответствующего поставщика.",
        ],
      },
      {
        title: "6. Цели и правовые основания",
        paragraphs: [
          "В зависимости от применимого законодательства техническая информация обрабатывается для выполнения запрошенной вами услуги и в законных интересах по эксплуатации, защите, диагностике и улучшению Seqgen. Если для необязательной технологии требуется согласие, оно будет запрошено отдельно.",
        ],
      },
      {
        title: "7. Срок хранения и передача",
        paragraphs: [
          "Локальная история находится под контролем вашего браузера. Серверные и инфраструктурные логи, если они включены, хранятся только в течение срока, необходимого для эксплуатации, согласно настройкам соответствующего хостинга.",
          "Информация может обрабатываться поставщиками инфраструктуры от имени сервиса либо раскрываться по требованию закона, для защиты прав и безопасности или при передаче сервиса другому владельцу. Seqgen не продаёт результаты генерации или персональные данные.",
        ],
      },
      {
        title: "8. Безопасность",
        paragraphs: [
          "Применяются разумные технические меры для защиты трафика и сокращения лишнего хранения. Ни один браузер, канал связи или способ хранения не может считаться абсолютно безопасным.",
          "Пароли, ключи и фразы восстановления следует считать секретными. Устройство, буфер обмена, расширения браузера, снимки экрана, резервные копии и целевое приложение могут раскрыть данные вне контроля Seqgen.",
        ],
      },
      {
        title: "9. Ваш выбор и права",
        paragraphs: [
          "Вы можете отказаться от локального хранения, очистив историю и данные сайта. Перед отправкой ссылки другому человеку можно удалить параметры URL и изменить сохранённый язык.",
          "В зависимости от вашей юрисдикции у вас могут быть права на доступ, исправление, удаление, ограничение обработки или возражение против неё, а также право обратиться в надзорный орган. Поскольку в Seqgen нет аккаунтов, связать технические данные с конкретным человеком может быть невозможно.",
        ],
      },
      {
        title: "10. Дети, международная обработка и обновления",
        paragraphs: [
          "Seqgen не предназначен специально для детей и не запрашивает у них персональные данные. Если местное законодательство требует согласия родителей, использование допускается только при наличии такого согласия.",
          "Технические данные могут обрабатываться в странах, где расположена инфраструктура сервиса. Применимые гарантии зависят от поставщика и юрисдикции.",
          "Политика может обновляться вслед за изменениями сервиса, способов хранения или требований законодательства. Дата в верхней части страницы обозначает актуальную редакцию.",
        ],
      },
    ],
  },
};

const de: LegalDocuments = {
  terms: {
    intro:
      "Diese Nutzungsbedingungen regeln den Zugriff auf Seqgen und dessen Nutzung, einschließlich Website, Generatoren und API. Mit der Nutzung von Seqgen bestätigen Sie, diese Bedingungen gelesen und akzeptiert zu haben.",
    sections: [
      {
        title: "1. Zweck des Dienstes",
        paragraphs: [
          "Seqgen bietet Werkzeuge zur Erzeugung von Passwörtern, Zahlen, Kennungen, mnemonischen Phrasen, Bytefolgen, VPN-Zugangsdaten und anderen technischen Werten. Der Dienst ist für eine rechtmäßige private und berufliche Nutzung bestimmt.",
          "Die Werte werden anhand Ihrer Parameter erzeugt. Seqgen prüft nicht, ob ein Ergebnis für ein bestimmtes System, Protokoll, eine Sicherheitsrichtlinie oder eine gesetzliche Anforderung geeignet ist.",
        ],
      },
      {
        title: "2. Berechtigung und Zustimmung",
        paragraphs: [
          "Sie dürfen Seqgen nur nutzen, wenn Sie diese Bedingungen rechtswirksam akzeptieren können. Bei Nutzung im Namen einer Organisation bestätigen Sie Ihre entsprechende Vertretungsbefugnis.",
        ],
      },
      {
        title: "3. Ihre Verantwortung",
        paragraphs: [
          "Sie sind für die Prüfung erzeugter Werte und den Schutz von Passwörtern, Schlüsseln, Wiederherstellungsphrasen und anderen vertraulichen Ergebnissen verantwortlich.",
        ],
        bullets: [
          "Veröffentlichen Sie Geheimnisse nicht in öffentlichen Repositories, Protokollen, Screenshots oder unsicheren Kommunikationskanälen.",
          "Erstellen Sie unabhängige Sicherungen, wenn der Verlust eines Wertes den Zugriff auf Daten oder Systeme verhindern könnte.",
          "Prüfen Sie die Kompatibilität mit der vorgesehenen Software, dem Protokoll und den Sicherheitsregeln.",
          "Nutzen Sie sichere Geräte, verschlüsselte Übertragung und angemessene Zugriffskontrollen.",
        ],
      },
      {
        title: "4. Zulässige Nutzung",
        paragraphs: [
          "Seqgen darf nicht zur Verletzung von Gesetzen oder Rechten Dritter, zur Störung des Dienstes oder zur Beeinträchtigung fremder Systeme verwendet werden.",
        ],
        bullets: [
          "Keine unbefugten Zugriffsversuche, Ausnutzung von Schwachstellen oder Umgehung technischer Beschränkungen.",
          "Keine Überlastung oder Automatisierung, die die Verfügbarkeit für andere beeinträchtigt.",
          "Keine Nutzung für Betrug, Schadsoftware, Phishing, Missbrauch oder unbefugte Überwachung.",
          "Seqgen darf nicht als Zertifizierung, Verwahrungsdienst, Identitätsprüfung oder Sicherheitsgarantie dargestellt werden.",
        ],
      },
      {
        title: "5. API-Nutzung",
        paragraphs: [
          "Die API-Nutzung unterliegt diesen Bedingungen und der veröffentlichten Dokumentation. Endpunkte, Limits, Parameter und Antwortformate können sich ändern.",
          "Sie sind für Antwortvalidierung, Fehlerbehandlung, sichere Netzwerkübertragung und angemessene Anfragelimits in Ihren Anwendungen verantwortlich.",
        ],
      },
      {
        title: "6. Geistiges Eigentum",
        paragraphs: [
          "Seqgen, Benutzeroberfläche, Marke und eigene Materialien sind durch geltendes Recht geschützt. An zufällig erzeugten Werten beansprucht Seqgen kein Eigentum.",
          "Bibliotheken, Bezeichnungen und Protokolle Dritter unterliegen ihren jeweiligen Lizenzen und Rechten.",
        ],
      },
      {
        title: "7. Verfügbarkeit und Änderungen",
        paragraphs: [
          "Der Dienst kann jederzeit geändert, ausgesetzt oder eingestellt werden. Funktionen können insbesondere aus Wartungs-, Sicherheits- oder Betriebsgründen ergänzt, entfernt oder eingeschränkt werden.",
          "Seqgen garantiert weder ununterbrochene Verfügbarkeit noch dauerhafte lokale Speicherung oder Kompatibilität mit jedem Browser und externen System.",
        ],
      },
      {
        title: "8. Gewährleistungsausschluss",
        paragraphs: [
          "Seqgen wird „wie besehen“ und „wie verfügbar“ bereitgestellt. Soweit gesetzlich zulässig, werden keine ausdrücklichen oder stillschweigenden Garantien für Richtigkeit, Eignung, Verfügbarkeit, Sicherheit oder Rechtsmängelfreiheit übernommen.",
          "Kryptografisch sichere Erzeugung reduziert Vorhersagbarkeit, schützt ein Geheimnis jedoch nicht auf kompromittierten Geräten, in Anwendungen, Zwischenablagen oder Netzwerken.",
        ],
      },
      {
        title: "9. Haftungsbeschränkung",
        paragraphs: [
          "Soweit gesetzlich zulässig, haften Seqgen und seine Betreiber nicht für mittelbare, zufällige, besondere oder Folgeschäden sowie den Verlust von Daten, Zugangsdaten, Zugriff, Einnahmen oder Geschäftsmöglichkeiten.",
          "Zwingende gesetzliche Haftung bleibt unberührt.",
        ],
      },
      {
        title: "10. Beendigung und Änderungen",
        paragraphs: [
          "Der Zugriff kann eingeschränkt werden, wenn eine Nutzung rechtliche, sicherheitsbezogene oder betriebliche Risiken verursacht oder diese Bedingungen wesentlich verletzt. Sie können die Nutzung jederzeit beenden und lokale Daten über die Verlaufsfunktionen oder Browsereinstellungen entfernen.",
          "Diese Bedingungen können bei Änderungen des Dienstes oder rechtlicher Anforderungen aktualisiert werden. Das Datum oben kennzeichnet die aktuelle Fassung. Die weitere Nutzung gilt als Zustimmung zur geänderten Fassung.",
        ],
      },
    ],
  },
  privacy: {
    intro:
      "Diese Datenschutzerklärung erläutert, welche Informationen Seqgen bei Nutzung der Website, Generatoren und API verarbeitet, zu welchen Zwecken dies geschieht und welche Wahlmöglichkeiten Sie haben.",
    sections: [
      {
        title: "1. Geltungsbereich und Grundsätze",
        paragraphs: [
          "Seqgen funktioniert ohne Benutzerkonto und ist auf Datenminimierung ausgelegt. Informationen werden nur verarbeitet, soweit dies zur Bereitstellung, Absicherung und Wartung des Dienstes erforderlich ist.",
          "Diese Erklärung gilt für Seqgen. Externe Websites, Hosting-Anbieter und Programme können eigene Datenschutzbestimmungen anwenden.",
        ],
      },
      {
        title: "2. Von Ihnen bereitgestellte Informationen",
        paragraphs: [
          "Generierungsanfragen enthalten gewählte Optionen wie Länge, Zeichensätze, Bereiche, Ausschlüsse, Format, Kodierung oder Anzahl. Parameter können in der URL erscheinen, damit die Konfiguration wiederhergestellt werden kann.",
          "Ergebnisse werden an den Browser zurückgegeben. Vertrauliche Informationen gehören nicht in URL-Parameter, da URLs im Browserverlauf, in Netzwerkinfrastruktur oder auf verweisenden Diensten gespeichert werden können.",
        ],
      },
      {
        title: "3. Lokaler Browserspeicher",
        paragraphs: [
          "Seqgen verwendet IndexedDB, um das letzte Ergebnis und bis zu 20 manuell erzeugte Verlaufseinträge je Generator zu speichern. Die Daten bleiben im Gerät und Browserprofil, bis Sie sie löschen, Websitedaten entfernen oder der Browser sie entfernt.",
          "Die Sprache kann in localStorage gespeichert werden. Lokaler Speicher sorgt für Kontinuität, ist aber weder Benutzerkonto noch Cloud-Sicherung.",
        ],
        bullets: [
          "Löschen Sie einzelne Einträge oder den gesamten Verlauf mit den Bedienelementen der Seite.",
          "Entfernen Sie alle lokalen Seqgen-Daten über die Website-Dateneinstellungen des Browsers.",
          "Nutzen Sie auf gemeinsam verwendeten Geräten den privaten Modus oder löschen Sie anschließend die lokalen Daten.",
        ],
      },
      {
        title: "4. Serververarbeitung",
        paragraphs: [
          "Generierungsparameter werden an die Seqgen-API gesendet; dort wird der Wert erzeugt und zurückgegeben. Ergebnisse werden nicht absichtlich in einer Anwendungsdatenbank gespeichert oder in Anwendungsprotokolle aufgenommen.",
          "Die Infrastruktur kann technische Daten wie IP-Adresse, Zeitpunkt, Route, Statuscode, User-Agent und Diagnoseinformationen verarbeiten. Dies kann für Bereitstellung, Sicherheit, Missbrauchsschutz und Fehlerbehebung erforderlich sein.",
        ],
      },
      {
        title: "5. Cookies und ähnliche Technologien",
        paragraphs: [
          "Für die Kernfunktionen benötigt Seqgen keine Werbe- oder Profiling-Cookies. Browserspeicher wird wie beschrieben für Sprache und Generatorzustand genutzt.",
          "Hosting- oder Sicherheitsanbieter können technisch notwendige Technologien für Auslieferung, Missbrauchsschutz oder Sitzungsverwaltung einsetzen.",
        ],
      },
      {
        title: "6. Zwecke und Rechtsgrundlagen",
        paragraphs: [
          "Je nach anwendbarem Recht erfolgt die Verarbeitung zur Erfüllung der angeforderten Leistung und aufgrund berechtigter Interessen am Betrieb, der Sicherheit, Fehleranalyse und Verbesserung von Seqgen. Eine gesetzlich erforderliche Einwilligung für optionale Technologien wird gesondert eingeholt.",
        ],
      },
      {
        title: "7. Speicherdauer und Weitergabe",
        paragraphs: [
          "Der lokale Verlauf unterliegt der Kontrolle Ihres Browsers. Server- und Infrastrukturprotokolle werden, sofern aktiviert, nur so lange aufbewahrt, wie es betrieblich erforderlich und beim jeweiligen Hosting konfiguriert ist.",
          "Daten können durch Infrastruktur-Anbieter im Auftrag verarbeitet oder bei gesetzlicher Pflicht, zum Schutz von Rechten und Sicherheit oder im Zusammenhang mit einer Dienstübertragung offengelegt werden. Seqgen verkauft keine erzeugten Werte oder personenbezogenen Daten.",
        ],
      },
      {
        title: "8. Sicherheit",
        paragraphs: [
          "Angemessene technische Maßnahmen schützen den Datenverkehr und reduzieren unnötige Speicherung. Kein Browser-, Netzwerk- oder Speichersystem ist vollständig sicher.",
          "Passwörter, Schlüssel und Wiederherstellungsphrasen sind vertraulich zu behandeln. Geräte, Zwischenablage, Erweiterungen, Screenshots, Sicherungen und Zielanwendungen liegen außerhalb der Kontrolle von Seqgen.",
        ],
      },
      {
        title: "9. Ihre Wahlmöglichkeiten und Rechte",
        paragraphs: [
          "Sie können lokale Speicherung durch Löschen von Verlauf und Websitedaten vermeiden, die Sprache ändern und URL-Parameter vor dem Teilen eines Links entfernen.",
          "Je nach Rechtsordnung können Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Beschwerde bei einer Aufsichtsbehörde bestehen. Ohne Benutzerkonten können personenbezogene Daten jedoch möglicherweise nicht einer bestimmten Person zugeordnet werden.",
        ],
      },
      {
        title: "10. Kinder, internationale Verarbeitung und Aktualisierungen",
        paragraphs: [
          "Seqgen richtet sich nicht an Kinder und fordert nicht wissentlich deren personenbezogene Daten an. Soweit eine elterliche Einwilligung vorgeschrieben ist, darf der Dienst nur mit dieser Einwilligung genutzt werden.",
          "Technische Daten können in Ländern verarbeitet werden, in denen die Infrastruktur betrieben wird. Schutzmaßnahmen hängen von Anbieter und Rechtsordnung ab.",
          "Diese Erklärung kann bei Änderungen des Dienstes, der Speicherpraxis oder gesetzlicher Pflichten aktualisiert werden. Das Datum oben kennzeichnet die aktuelle Fassung.",
        ],
      },
    ],
  },
};

const fr: LegalDocuments = {
  terms: {
    intro:
      "Les présentes Conditions d’utilisation régissent l’accès à Seqgen et son utilisation, notamment le site, les générateurs et l’API. En utilisant Seqgen, vous confirmez avoir lu et accepté ces Conditions.",
    sections: [
      {
        title: "1. Objet du service",
        paragraphs: [
          "Seqgen fournit des outils de génération de mots de passe, nombres, identifiants, phrases mnémoniques, séquences d’octets, identifiants VPN et autres valeurs techniques. Le service est destiné à un usage personnel et professionnel licite.",
          "Les valeurs sont produites selon vos paramètres. Seqgen ne vérifie pas leur adéquation à un système, protocole, politique de sécurité ou exigence légale particulière.",
        ],
      },
      {
        title: "2. Capacité et acceptation",
        paragraphs: [
          "Vous ne pouvez utiliser Seqgen que si vous êtes juridiquement en mesure d’accepter ces Conditions. Si vous agissez pour une organisation, vous déclarez être autorisé à l’engager.",
        ],
      },
      {
        title: "3. Vos responsabilités",
        paragraphs: [
          "Vous devez vérifier les valeurs avant utilisation et protéger les mots de passe, clés, phrases de récupération et autres résultats confidentiels.",
        ],
        bullets: [
          "Ne publiez pas de secrets dans des dépôts publics, journaux, captures d’écran ou canaux non fiables.",
          "Conservez des sauvegardes indépendantes lorsqu’une perte pourrait bloquer l’accès à des données ou systèmes.",
          "Vérifiez la compatibilité avec le logiciel, le protocole et les règles de sécurité concernés.",
          "Utilisez un appareil protégé, un transport chiffré et des contrôles d’accès adaptés.",
        ],
      },
      {
        title: "4. Utilisation acceptable",
        paragraphs: [
          "Vous ne devez pas utiliser Seqgen pour enfreindre la loi ou les droits de tiers, perturber le service ou compromettre d’autres systèmes.",
        ],
        bullets: [
          "Aucun accès non autorisé, exploitation de vulnérabilité ou contournement de restriction technique.",
          "Aucune surcharge ou automatisation dégradant la disponibilité pour les autres utilisateurs.",
          "Aucune utilisation à des fins de fraude, logiciel malveillant, hameçonnage, abus ou surveillance non autorisée.",
          "Ne présentez pas Seqgen comme un service de certification, de conservation, de vérification d’identité ou une garantie de sécurité.",
        ],
      },
      {
        title: "5. Utilisation de l’API",
        paragraphs: [
          "L’API est soumise à ces Conditions et à la documentation publiée. Les endpoints, limites, paramètres et formats de réponse peuvent évoluer.",
          "Vous êtes responsable de la validation des réponses, du traitement des erreurs, de la sécurité réseau et de limites de requêtes adaptées.",
        ],
      },
      {
        title: "6. Propriété intellectuelle",
        paragraphs: [
          "Seqgen, son interface, sa marque et ses contenus originaux sont protégés par le droit applicable. Seqgen ne revendique aucun droit de propriété sur les valeurs aléatoires générées.",
          "Les bibliothèques, noms et protocoles tiers restent soumis à leurs licences et droits respectifs.",
        ],
      },
      {
        title: "7. Disponibilité et modifications",
        paragraphs: [
          "Le service peut être modifié, suspendu ou arrêté à tout moment. Des fonctions peuvent être ajoutées, supprimées ou limitées pour des raisons techniques, opérationnelles ou de sécurité.",
          "Seqgen ne garantit ni une disponibilité continue, ni la conservation permanente de l’historique local, ni la compatibilité avec tous les navigateurs et systèmes.",
        ],
      },
      {
        title: "8. Exclusion de garanties",
        paragraphs: [
          "Seqgen est fourni « en l’état » et « selon disponibilité ». Dans la mesure permise par la loi, aucune garantie expresse ou implicite n’est donnée quant à l’exactitude, l’adéquation, la disponibilité, la sécurité ou l’absence de contrefaçon.",
          "Une génération cryptographiquement sûre réduit la prévisibilité, mais ne protège pas un secret sur un appareil, une application, un presse-papiers ou un réseau compromis.",
        ],
      },
      {
        title: "9. Limitation de responsabilité",
        paragraphs: [
          "Dans la mesure permise par la loi, Seqgen et ses responsables ne répondent pas des dommages indirects, accessoires, spéciaux ou consécutifs, ni des pertes de données, identifiants, accès, revenus ou activités.",
          "Aucune disposition n’exclut une responsabilité qui ne peut légalement être exclue.",
        ],
      },
      {
        title: "10. Fin d’accès et modification des Conditions",
        paragraphs: [
          "L’accès peut être limité en cas de risque juridique, sécuritaire ou opérationnel, ou de violation substantielle. Vous pouvez cesser d’utiliser le service et supprimer les données locales via l’historique ou les réglages du navigateur.",
          "Ces Conditions peuvent être mises à jour. La date affichée en haut indique la version actuelle. La poursuite de l’utilisation vaut acceptation de la version révisée.",
        ],
      },
    ],
  },
  privacy: {
    intro:
      "La présente Politique de confidentialité explique les informations traitées par Seqgen, les raisons de ce traitement et vos choix lors de l’utilisation du site, des générateurs et de l’API.",
    sections: [
      {
        title: "1. Champ d’application et principes",
        paragraphs: [
          "Seqgen fonctionne sans compte et vise à minimiser la collecte de données personnelles. Les informations ne sont traitées que pour fournir, sécuriser et maintenir le service.",
          "Cette Politique couvre Seqgen. Les sites externes, hébergeurs et logiciels utilisés avec les résultats peuvent appliquer leurs propres règles.",
        ],
      },
      {
        title: "2. Informations que vous fournissez",
        paragraphs: [
          "Une requête contient les options choisies : longueur, jeux de caractères, plages, exclusions, format, encodage ou quantité. Ces paramètres peuvent figurer dans l’URL afin de restaurer la configuration.",
          "Les résultats sont renvoyés au navigateur. Ne placez pas d’informations confidentielles dans l’URL, qui peut être conservée dans l’historique, l’infrastructure réseau ou le service d’origine d’un lien.",
        ],
      },
      {
        title: "3. Stockage local du navigateur",
        paragraphs: [
          "Seqgen utilise IndexedDB pour conserver le dernier résultat et jusqu’à 20 entrées générées manuellement par générateur. Ces données restent sur l’appareil et le profil du navigateur jusqu’à leur suppression par vous ou par le navigateur.",
          "La langue peut être enregistrée dans localStorage. Ce stockage facilite les visites suivantes, mais ne constitue ni un compte ni une sauvegarde cloud.",
        ],
        bullets: [
          "Supprimez une entrée ou tout l’historique avec les commandes de la page.",
          "Supprimez toutes les données locales de Seqgen dans les réglages des données de sites du navigateur.",
          "Sur un appareil partagé, utilisez la navigation privée ou effacez les données après utilisation.",
        ],
      },
      {
        title: "4. Traitement côté serveur",
        paragraphs: [
          "Les paramètres sont envoyés à l’API Seqgen, qui génère puis renvoie la valeur. Les résultats ne sont pas volontairement inscrits dans une base applicative ni inclus dans les journaux applicatifs.",
          "L’infrastructure peut traiter l’adresse IP, l’heure, la route, le statut de réponse, le user agent et des données de diagnostic pour assurer la livraison, la sécurité, la prévention des abus et le dépannage.",
        ],
      },
      {
        title: "5. Cookies et technologies similaires",
        paragraphs: [
          "Seqgen n’a pas besoin de cookies publicitaires ou de profilage pour ses fonctions principales. Le stockage du navigateur sert à la langue et à l’état des générateurs comme indiqué ci-dessus.",
          "Un hébergeur ou fournisseur de sécurité peut utiliser des technologies strictement nécessaires à la livraison du trafic, à la prévention des abus ou au maintien d’une session.",
        ],
      },
      {
        title: "6. Finalités et bases juridiques",
        paragraphs: [
          "Selon le droit applicable, les données techniques sont traitées pour exécuter le service demandé et au titre des intérêts légitimes liés à l’exploitation, la sécurité, le diagnostic et l’amélioration de Seqgen. Un consentement sera demandé séparément lorsqu’il est légalement requis.",
        ],
      },
      {
        title: "7. Conservation et communication",
        paragraphs: [
          "L’historique local reste sous le contrôle du navigateur. Les journaux serveur et d’infrastructure, s’ils sont activés, ne sont conservés que pendant la durée opérationnellement nécessaire selon la configuration d’hébergement.",
          "Les informations peuvent être traitées par des prestataires d’infrastructure, divulguées si la loi l’exige, pour protéger les droits et la sécurité ou lors d’un transfert du service. Seqgen ne vend ni résultats générés ni données personnelles.",
        ],
      },
      {
        title: "8. Sécurité",
        paragraphs: [
          "Des mesures techniques raisonnables protègent le trafic et limitent la conservation inutile. Aucun navigateur, réseau ou système de stockage n’est totalement sûr.",
          "Les mots de passe, clés et phrases de récupération doivent rester secrets. Appareil, presse-papiers, extensions, captures, sauvegardes et application cible peuvent exposer des données hors du contrôle de Seqgen.",
        ],
      },
      {
        title: "9. Vos choix et vos droits",
        paragraphs: [
          "Vous pouvez effacer l’historique et les données du site, changer la langue et retirer les paramètres d’URL avant de partager un lien.",
          "Selon votre juridiction, vous pouvez disposer de droits d’accès, rectification, effacement, limitation, opposition et réclamation auprès d’une autorité. Sans compte, il peut être impossible de relier des données techniques à une personne précise.",
        ],
      },
      {
        title: "10. Mineurs, transferts internationaux et mises à jour",
        paragraphs: [
          "Seqgen ne cible pas les enfants et ne leur demande pas sciemment de données personnelles. Lorsqu’un consentement parental est requis, le service ne peut être utilisé qu’avec ce consentement.",
          "Des données techniques peuvent être traitées dans les pays où fonctionne l’infrastructure. Les garanties applicables dépendent du prestataire et de la juridiction.",
          "Cette Politique peut évoluer avec le service, le stockage ou les obligations légales. La date affichée en haut indique la version actuelle.",
        ],
      },
    ],
  },
};

const es: LegalDocuments = {
  terms: {
    intro:
      "Estos Términos de uso regulan el acceso y uso de Seqgen, incluidos el sitio web, los generadores y la API. Al utilizar Seqgen, confirmas que has leído y aceptado estos Términos.",
    sections: [
      {
        title: "1. Finalidad del servicio",
        paragraphs: [
          "Seqgen proporciona herramientas para generar contraseñas, números, identificadores, frases mnemónicas, secuencias de bytes, credenciales VPN y otros valores técnicos. El servicio está destinado a un uso personal y profesional lícito.",
          "Los valores se producen según los parámetros elegidos. Seqgen no comprueba si un resultado es adecuado para un sistema, protocolo, política de seguridad o requisito legal específico.",
        ],
      },
      {
        title: "2. Capacidad y aceptación",
        paragraphs: [
          "Solo puedes utilizar Seqgen si tienes capacidad legal para aceptar estos Términos. Si actúas en nombre de una organización, declaras estar autorizado para vincularla.",
        ],
      },
      {
        title: "3. Tus responsabilidades",
        paragraphs: [
          "Eres responsable de revisar los valores antes de usarlos y de proteger contraseñas, claves, frases de recuperación y otros resultados confidenciales.",
        ],
        bullets: [
          "No publiques secretos en repositorios públicos, registros, capturas de pantalla o canales no fiables.",
          "Mantén copias de seguridad independientes cuando perder un valor pueda impedir el acceso a datos o sistemas.",
          "Comprueba la compatibilidad con el software, protocolo y normas de seguridad correspondientes.",
          "Utiliza dispositivos protegidos, transporte cifrado y controles de acceso adecuados.",
        ],
      },
      {
        title: "4. Uso aceptable",
        paragraphs: [
          "No debes utilizar Seqgen para infringir la ley o derechos de terceros, interrumpir el servicio o comprometer otros sistemas.",
        ],
        bullets: [
          "No intentes acceder sin autorización, explotar vulnerabilidades ni eludir restricciones técnicas.",
          "No sobrecargues ni automatices solicitudes de forma que perjudiquen la disponibilidad.",
          "No uses los resultados para fraude, malware, phishing, abuso o vigilancia no autorizada.",
          "No presentes Seqgen como certificación, custodia, verificación de identidad o garantía de seguridad.",
        ],
      },
      {
        title: "5. Uso de la API",
        paragraphs: [
          "El uso de la API está sujeto a estos Términos y a la documentación publicada. Los endpoints, límites, parámetros y formatos pueden cambiar.",
          "Eres responsable de validar respuestas, gestionar errores, proteger el tráfico y aplicar límites adecuados en tus aplicaciones.",
        ],
      },
      {
        title: "6. Propiedad intelectual",
        paragraphs: [
          "Seqgen, su interfaz, marca y materiales originales están protegidos por la legislación aplicable. Seqgen no reclama la propiedad de los valores aleatorios generados.",
          "Las bibliotecas, nombres y protocolos de terceros están sujetos a sus respectivas licencias y derechos.",
        ],
      },
      {
        title: "7. Disponibilidad y cambios",
        paragraphs: [
          "El servicio puede modificarse, suspenderse o finalizarse en cualquier momento. Las funciones pueden añadirse, eliminarse o limitarse por motivos técnicos, operativos o de seguridad.",
          "Seqgen no garantiza disponibilidad ininterrumpida, almacenamiento local permanente ni compatibilidad con todos los navegadores y sistemas.",
        ],
      },
      {
        title: "8. Exclusión de garantías",
        paragraphs: [
          "Seqgen se proporciona «tal cual» y «según disponibilidad». En la medida permitida por la ley, no se ofrecen garantías expresas o implícitas de exactitud, idoneidad, disponibilidad, seguridad o ausencia de infracción.",
          "La generación criptográficamente segura reduce la previsibilidad, pero no protege un secreto en un dispositivo, aplicación, portapapeles o red comprometidos.",
        ],
      },
      {
        title: "9. Limitación de responsabilidad",
        paragraphs: [
          "En la medida permitida por la ley, Seqgen y sus responsables no responden por daños indirectos, incidentales, especiales o consecuentes, ni por pérdidas de datos, credenciales, acceso, ingresos o actividad.",
          "Nada de lo aquí dispuesto excluye responsabilidades que legalmente no puedan excluirse.",
        ],
      },
      {
        title: "10. Finalización y cambios de los Términos",
        paragraphs: [
          "El acceso puede limitarse cuando el uso genere riesgos legales, de seguridad u operativos, o incumpla sustancialmente estos Términos. Puedes dejar de utilizar el servicio y borrar los datos locales desde el historial o el navegador.",
          "Estos Términos pueden actualizarse cuando cambie el servicio o la ley. La fecha superior identifica la versión vigente. El uso continuado implica la aceptación de la versión revisada.",
        ],
      },
    ],
  },
  privacy: {
    intro:
      "Esta Política de privacidad explica qué información trata Seqgen, por qué se trata y qué opciones tienes al utilizar el sitio web, los generadores y la API.",
    sections: [
      {
        title: "1. Ámbito y principios",
        paragraphs: [
          "Seqgen funciona sin cuentas y está diseñado para minimizar la recogida de datos personales. La información se trata solo cuando es necesaria para prestar, proteger y mantener el servicio.",
          "Esta Política cubre Seqgen. Los sitios externos, proveedores de alojamiento y programas utilizados con los resultados pueden aplicar sus propias políticas.",
        ],
      },
      {
        title: "2. Información que proporcionas",
        paragraphs: [
          "Las solicitudes contienen las opciones elegidas: longitud, conjuntos de caracteres, rangos, exclusiones, formato, codificación o cantidad. Estos parámetros pueden aparecer en la URL para restaurar la configuración.",
          "Los resultados se devuelven al navegador. No incluyas información confidencial en una URL, ya que puede conservarse en el historial, la infraestructura de red o el servicio desde el que se siguió un enlace.",
        ],
      },
      {
        title: "3. Almacenamiento local del navegador",
        paragraphs: [
          "Seqgen utiliza IndexedDB para conservar el último resultado y hasta 20 entradas generadas manualmente por cada generador. Los datos permanecen en el dispositivo y perfil del navegador hasta que los elimines o el navegador los borre.",
          "El idioma puede guardarse en localStorage. Este almacenamiento facilita futuras visitas, pero no es una cuenta ni una copia de seguridad en la nube.",
        ],
        bullets: [
          "Elimina entradas individuales o todo el historial mediante los controles de la página.",
          "Borra todos los datos locales de Seqgen desde la configuración de datos de sitios del navegador.",
          "En dispositivos compartidos, usa navegación privada o borra los datos después de utilizar el servicio.",
        ],
      },
      {
        title: "4. Tratamiento en el servidor",
        paragraphs: [
          "Los parámetros se envían a la API de Seqgen, donde se genera y devuelve el valor solicitado. Los resultados no se escriben intencionadamente en una base de datos de la aplicación ni se incluyen en sus registros.",
          "La infraestructura puede tratar la dirección IP, hora, ruta, estado de respuesta, user agent e información de diagnóstico para entregar el servicio, protegerlo, evitar abusos y resolver errores.",
        ],
      },
      {
        title: "5. Cookies y tecnologías similares",
        paragraphs: [
          "Seqgen no necesita cookies publicitarias o de perfilado para sus funciones principales. El almacenamiento del navegador se usa para el idioma y el estado de los generadores.",
          "Un proveedor de alojamiento o seguridad puede utilizar tecnologías estrictamente necesarias para entregar tráfico, evitar abusos o mantener una sesión.",
        ],
      },
      {
        title: "6. Finalidades y bases jurídicas",
        paragraphs: [
          "Según la legislación aplicable, la información técnica se trata para ejecutar el servicio solicitado y por intereses legítimos en operar, proteger, diagnosticar y mejorar Seqgen. Cuando una tecnología opcional requiera consentimiento, se solicitará por separado.",
        ],
      },
      {
        title: "7. Conservación y comunicación",
        paragraphs: [
          "El historial local está bajo el control del navegador. Los registros del servidor y la infraestructura, si están habilitados, se conservan solo durante el periodo operativamente necesario según la configuración del alojamiento.",
          "La información puede ser tratada por proveedores de infraestructura, comunicada por obligación legal, para proteger derechos y seguridad o al transferir el servicio. Seqgen no vende resultados generados ni datos personales.",
        ],
      },
      {
        title: "8. Seguridad",
        paragraphs: [
          "Se aplican medidas técnicas razonables para proteger el tráfico y reducir la conservación innecesaria. Ningún navegador, red o sistema de almacenamiento es completamente seguro.",
          "Las contraseñas, claves y frases de recuperación deben tratarse como secretos. El dispositivo, portapapeles, extensiones, capturas, copias y aplicación de destino pueden exponer datos fuera del control de Seqgen.",
        ],
      },
      {
        title: "9. Tus opciones y derechos",
        paragraphs: [
          "Puedes borrar el historial y los datos del sitio, cambiar el idioma y eliminar parámetros de la URL antes de compartir un enlace.",
          "Según tu jurisdicción, puedes tener derechos de acceso, rectificación, supresión, limitación, oposición y reclamación ante una autoridad. Al no existir cuentas, puede no ser posible vincular datos técnicos con una persona concreta.",
        ],
      },
      {
        title: "10. Menores, tratamiento internacional y actualizaciones",
        paragraphs: [
          "Seqgen no está dirigido a menores ni solicita deliberadamente sus datos personales. Cuando la ley exija consentimiento parental, solo podrá utilizarse con dicho consentimiento.",
          "Los datos técnicos pueden tratarse en países donde opere la infraestructura. Las garantías aplicables dependen del proveedor y la jurisdicción.",
          "Esta Política puede actualizarse para reflejar cambios del servicio, almacenamiento u obligaciones legales. La fecha superior identifica la versión vigente.",
        ],
      },
    ],
  },
};

export const legalDocuments = { en, ru, de, fr, es } as const;

export function getLegalDocument(
  language: string,
  type: LegalDocumentType,
) {
  const locale = language.split("-")[0] as keyof typeof legalDocuments;
  return (legalDocuments[locale] ?? legalDocuments.en)[type];
}
