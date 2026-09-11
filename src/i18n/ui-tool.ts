import type { Locale } from "@/lib/i18n";

/** Textos fijos de las fichas de herramienta. */
export const esTool = {
  "nav.home": "Inicio",
  "tool.model": "Modelo",
  "tool.price": "Precio",
  "tool.freePlan": "Plan gratis",
  "tool.level": "Nivel",
  "tool.api": "API",
  "tool.idealFor": "Ideal para",
  "tool.yes": "Sí",
  "tool.no": "No",
  "tool.what": "Qué es {name}",
  "tool.features": "Funciones principales",
  "tool.pros": "Ventajas",
  "tool.cons": "Limitaciones",
  "tool.useCases": "Casos de uso reales",
  "tool.comparisons": "Comparativas con {name}",
  "tool.sources": "Fuentes consultadas",
  "tool.access": "Acceso",
  "tool.official": "Ir a la web oficial",
  "tool.externalNote": "Enlace externo. AIForge no gestiona esta plataforma.",
  "tool.alternatives": "Alternativas",
};

type Dict = Partial<Record<keyof typeof esTool, string>>;

const en: Dict = {
  "nav.home": "Home", "tool.model": "Model", "tool.price": "Price", "tool.freePlan": "Free plan",
  "tool.level": "Level", "tool.api": "API", "tool.idealFor": "Ideal for", "tool.yes": "Yes", "tool.no": "No",
  "tool.what": "What is {name}", "tool.features": "Key features", "tool.pros": "Strengths", "tool.cons": "Limitations",
  "tool.useCases": "Real use cases", "tool.comparisons": "Comparisons with {name}", "tool.sources": "Sources consulted",
  "tool.access": "Access", "tool.official": "Go to official site",
  "tool.externalNote": "External link. AIForge does not run this platform.", "tool.alternatives": "Alternatives",
};

const pt: Dict = {
  "nav.home": "Início", "tool.model": "Modelo", "tool.price": "Preço", "tool.freePlan": "Plano gratuito",
  "tool.level": "Nível", "tool.api": "API", "tool.idealFor": "Ideal para", "tool.yes": "Sim", "tool.no": "Não",
  "tool.what": "O que é {name}", "tool.features": "Funções principais", "tool.pros": "Vantagens", "tool.cons": "Limitações",
  "tool.useCases": "Casos de uso reais", "tool.comparisons": "Comparativos com {name}", "tool.sources": "Fontes consultadas",
  "tool.access": "Acesso", "tool.official": "Ir para o site oficial",
  "tool.externalNote": "Ligação externa. A AIForge não gere esta plataforma.", "tool.alternatives": "Alternativas",
};

const ja: Dict = {
  "nav.home": "ホーム", "tool.model": "モデル", "tool.price": "料金", "tool.freePlan": "無料プラン",
  "tool.level": "レベル", "tool.api": "API", "tool.idealFor": "おすすめの用途", "tool.yes": "あり", "tool.no": "なし",
  "tool.what": "{name} とは", "tool.features": "主な機能", "tool.pros": "長所", "tool.cons": "制限",
  "tool.useCases": "実際の使用例", "tool.comparisons": "{name} との比較", "tool.sources": "参照した情報源",
  "tool.access": "アクセス", "tool.official": "公式サイトへ",
  "tool.externalNote": "外部リンクです。AIForge はこのサービスを運営していません。", "tool.alternatives": "代替ツール",
};

const zh: Dict = {
  "nav.home": "首页", "tool.model": "模式", "tool.price": "价格", "tool.freePlan": "免费方案",
  "tool.level": "难度", "tool.api": "API", "tool.idealFor": "适合", "tool.yes": "是", "tool.no": "否",
  "tool.what": "什么是 {name}", "tool.features": "主要功能", "tool.pros": "优点", "tool.cons": "局限",
  "tool.useCases": "实际用例", "tool.comparisons": "与 {name} 的对比", "tool.sources": "参考来源",
  "tool.access": "访问", "tool.official": "前往官网",
  "tool.externalNote": "外部链接。AIForge 并不运营该平台。", "tool.alternatives": "替代方案",
};

const hi: Dict = {
  "nav.home": "होम", "tool.model": "मॉडल", "tool.price": "कीमत", "tool.freePlan": "फ्री प्लान",
  "tool.level": "स्तर", "tool.api": "API", "tool.idealFor": "किसके लिए सही", "tool.yes": "हाँ", "tool.no": "नहीं",
  "tool.what": "{name} क्या है", "tool.features": "मुख्य विशेषताएँ", "tool.pros": "खूबियाँ", "tool.cons": "सीमाएँ",
  "tool.useCases": "वास्तविक उपयोग", "tool.comparisons": "{name} से तुलना", "tool.sources": "स्रोत",
  "tool.access": "एक्सेस", "tool.official": "आधिकारिक साइट पर जाएँ",
  "tool.externalNote": "बाहरी लिंक। AIForge इस प्लेटफ़ॉर्म का संचालन नहीं करता।", "tool.alternatives": "विकल्प",
};

const ar: Dict = {
  "nav.home": "الرئيسية", "tool.model": "النموذج", "tool.price": "السعر", "tool.freePlan": "خطة مجانية",
  "tool.level": "المستوى", "tool.api": "واجهة برمجية", "tool.idealFor": "مناسب لـ", "tool.yes": "نعم", "tool.no": "لا",
  "tool.what": "ما هو {name}", "tool.features": "الميزات الرئيسية", "tool.pros": "المزايا", "tool.cons": "القيود",
  "tool.useCases": "حالات استخدام واقعية", "tool.comparisons": "مقارنات مع {name}", "tool.sources": "المصادر",
  "tool.access": "الوصول", "tool.official": "الانتقال إلى الموقع الرسمي",
  "tool.externalNote": "رابط خارجي. AIForge لا تدير هذه المنصة.", "tool.alternatives": "بدائل",
};

const fr: Dict = {
  "nav.home": "Accueil", "tool.model": "Modèle", "tool.price": "Prix", "tool.freePlan": "Offre gratuite",
  "tool.level": "Niveau", "tool.api": "API", "tool.idealFor": "Idéal pour", "tool.yes": "Oui", "tool.no": "Non",
  "tool.what": "Qu'est-ce que {name}", "tool.features": "Fonctions principales", "tool.pros": "Points forts", "tool.cons": "Limites",
  "tool.useCases": "Cas d'usage réels", "tool.comparisons": "Comparatifs avec {name}", "tool.sources": "Sources consultées",
  "tool.access": "Accès", "tool.official": "Aller sur le site officiel",
  "tool.externalNote": "Lien externe. AIForge ne gère pas cette plateforme.", "tool.alternatives": "Alternatives",
};

const de: Dict = {
  "nav.home": "Start", "tool.model": "Modell", "tool.price": "Preis", "tool.freePlan": "Gratis-Tarif",
  "tool.level": "Niveau", "tool.api": "API", "tool.idealFor": "Ideal für", "tool.yes": "Ja", "tool.no": "Nein",
  "tool.what": "Was ist {name}", "tool.features": "Hauptfunktionen", "tool.pros": "Stärken", "tool.cons": "Grenzen",
  "tool.useCases": "Praxisbeispiele", "tool.comparisons": "Vergleiche mit {name}", "tool.sources": "Verwendete Quellen",
  "tool.access": "Zugang", "tool.official": "Zur offiziellen Website",
  "tool.externalNote": "Externer Link. AIForge betreibt diese Plattform nicht.", "tool.alternatives": "Alternativen",
};

const ru: Dict = {
  "nav.home": "Главная", "tool.model": "Модель", "tool.price": "Цена", "tool.freePlan": "Бесплатный план",
  "tool.level": "Уровень", "tool.api": "API", "tool.idealFor": "Подходит для", "tool.yes": "Да", "tool.no": "Нет",
  "tool.what": "Что такое {name}", "tool.features": "Основные функции", "tool.pros": "Плюсы", "tool.cons": "Ограничения",
  "tool.useCases": "Реальные сценарии", "tool.comparisons": "Сравнения с {name}", "tool.sources": "Источники",
  "tool.access": "Доступ", "tool.official": "Перейти на официальный сайт",
  "tool.externalNote": "Внешняя ссылка. AIForge не управляет этой платформой.", "tool.alternatives": "Альтернативы",
};

export const toolMessages: Record<Locale, Record<string, string>> = {
  es: esTool, en, pt, ja, zh, hi, ar, fr, de, ru,
};
