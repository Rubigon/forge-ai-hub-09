import type { Locale } from "@/lib/i18n";

/**
 * Traducción de contenido corto: nombres de categoría y descripciones breves
 * (taglines) de las fichas. Si falta una traducción se muestra el español.
 */

type Map = Record<string, string>;

const categoryNames: Partial<Record<Locale, Map>> = {
  en: {
    chatbots: "Chatbots", imagenes: "Image generation", video: "Video generation", audio: "Audio", musica: "Music",
    programacion: "Coding", marketing: "Marketing", productividad: "Productivity", educacion: "Education",
    automatizacion: "Automation", diseno: "Design", investigacion: "Research", presentaciones: "Presentations",
    escritura: "Writing", "analisis-datos": "Data analysis",
  },
  pt: {
    chatbots: "Chatbots", imagenes: "Geração de imagens", video: "Geração de vídeo", audio: "Áudio", musica: "Música",
    programacion: "Programação", marketing: "Marketing", productividad: "Produtividade", educacion: "Educação",
    automatizacion: "Automação", diseno: "Design", investigacion: "Investigação", presentaciones: "Apresentações",
    escritura: "Escrita", "analisis-datos": "Análise de dados",
  },
  ja: {
    chatbots: "チャットボット", imagenes: "画像生成", video: "動画生成", audio: "音声", musica: "音楽",
    programacion: "プログラミング", marketing: "マーケティング", productividad: "生産性", educacion: "教育",
    automatizacion: "自動化", diseno: "デザイン", investigacion: "リサーチ", presentaciones: "プレゼン資料",
    escritura: "ライティング", "analisis-datos": "データ分析",
  },
  zh: {
    chatbots: "聊天机器人", imagenes: "图像生成", video: "视频生成", audio: "音频", musica: "音乐",
    programacion: "编程", marketing: "营销", productividad: "效率", educacion: "教育",
    automatizacion: "自动化", diseno: "设计", investigacion: "研究", presentaciones: "演示文稿",
    escritura: "写作", "analisis-datos": "数据分析",
  },
  hi: {
    chatbots: "चैटबॉट", imagenes: "इमेज जनरेशन", video: "वीडियो जनरेशन", audio: "ऑडियो", musica: "संगीत",
    programacion: "प्रोग्रामिंग", marketing: "मार्केटिंग", productividad: "उत्पादकता", educacion: "शिक्षा",
    automatizacion: "ऑटोमेशन", diseno: "डिज़ाइन", investigacion: "शोध", presentaciones: "प्रेजेंटेशन",
    escritura: "लेखन", "analisis-datos": "डेटा विश्लेषण",
  },
  ar: {
    chatbots: "روبوتات الدردشة", imagenes: "توليد الصور", video: "توليد الفيديو", audio: "الصوت", musica: "الموسيقى",
    programacion: "البرمجة", marketing: "التسويق", productividad: "الإنتاجية", educacion: "التعليم",
    automatizacion: "الأتمتة", diseno: "التصميم", investigacion: "البحث", presentaciones: "العروض التقديمية",
    escritura: "الكتابة", "analisis-datos": "تحليل البيانات",
  },
  fr: {
    chatbots: "Chatbots", imagenes: "Génération d'images", video: "Génération de vidéo", audio: "Audio", musica: "Musique",
    programacion: "Programmation", marketing: "Marketing", productividad: "Productivité", educacion: "Éducation",
    automatizacion: "Automatisation", diseno: "Design", investigacion: "Recherche", presentaciones: "Présentations",
    escritura: "Rédaction", "analisis-datos": "Analyse de données",
  },
  de: {
    chatbots: "Chatbots", imagenes: "Bildgenerierung", video: "Videogenerierung", audio: "Audio", musica: "Musik",
    programacion: "Programmierung", marketing: "Marketing", productividad: "Produktivität", educacion: "Bildung",
    automatizacion: "Automatisierung", diseno: "Design", investigacion: "Recherche", presentaciones: "Präsentationen",
    escritura: "Schreiben", "analisis-datos": "Datenanalyse",
  },
  ru: {
    chatbots: "Чат-боты", imagenes: "Генерация изображений", video: "Генерация видео", audio: "Аудио", musica: "Музыка",
    programacion: "Программирование", marketing: "Маркетинг", productividad: "Продуктивность", educacion: "Образование",
    automatizacion: "Автоматизация", diseno: "Дизайн", investigacion: "Исследования", presentaciones: "Презентации",
    escritura: "Тексты", "analisis-datos": "Анализ данных",
  },
};

const taglines: Partial<Record<Locale, Map>> = {
  en: {
    chatgpt: "OpenAI's general-purpose conversational assistant.",
    claude: "Anthropic's model focused on reasoning and code.",
    gemini: "Google's assistant, integrated with its ecosystem.",
    perplexity: "Answer engine with real-time citations and sources.",
    midjourney: "High-quality artistic image generation.",
    flux: "Open image models from Black Forest Labs.",
    ideogram: "Images with highly legible embedded text.",
    runway: "Creative suite for generative video.",
    elevenlabs: "Realistic voice synthesis and cloning.",
    suno: "Full songs generated from a text prompt.",
    cursor: "Code editor with AI built into your workflow.",
    "github-copilot": "The code assistant built into GitHub and your IDE.",
    windsurf: "Agentic IDE with automated workflows.",
    v0: "Generate React and Tailwind interfaces from plain language.",
    lovable: "Build complete web apps by describing what you want.",
    bolt: "Full-stack web development with AI in the browser.",
    "notion-ai": "AI built into your Notion workspace.",
    zapier: "Automate flows across thousands of apps, now with AI.",
    make: "Visual automation for complex workflows.",
    jasper: "AI marketing content platform.",
    gamma: "Presentations and documents generated with AI.",
    notebooklm: "Research assistant that works on your own sources.",
    otter: "Automatic meeting transcription and summaries.",
    julius: "Conversational data analysis.",
    "canva-magic-studio": "AI-assisted graphic design inside Canva.",
    "figma-ai": "Interface prototyping with AI assistance.",
    grammarly: "AI-assisted grammar and style editor.",
    "deepl-write": "Rewrite and polish text with native-level quality.",
  },
  pt: {
    chatgpt: "Assistente de conversa generalista da OpenAI.",
    claude: "Modelo da Anthropic focado em raciocínio e código.",
    gemini: "O assistente da Google, integrado no seu ecossistema.",
    perplexity: "Motor de respostas com citações e fontes em tempo real.",
    midjourney: "Geração de imagens artísticas de alta qualidade.",
    flux: "Modelos de imagem abertos da Black Forest Labs.",
    ideogram: "Imagens com texto integrado de grande legibilidade.",
    runway: "Suite criativa de vídeo generativo.",
    elevenlabs: "Síntese e clonagem de voz realista.",
    suno: "Músicas completas geradas a partir de texto.",
    cursor: "Editor de código com IA integrada no fluxo de trabalho.",
    "github-copilot": "O assistente de código integrado no GitHub e no teu IDE.",
    windsurf: "IDE agêntico com fluxos de trabalho automatizados.",
    v0: "Gera interfaces React e Tailwind com linguagem natural.",
    lovable: "Cria aplicações web completas descrevendo o que queres.",
    bolt: "Desenvolvimento web full-stack com IA no navegador.",
    "notion-ai": "IA integrada no teu espaço de trabalho Notion.",
    zapier: "Automatiza fluxos entre milhares de aplicações, agora com IA.",
    make: "Automação visual de fluxos complexos.",
    jasper: "Plataforma de conteúdo de marketing com IA.",
    gamma: "Apresentações e documentos gerados com IA.",
    notebooklm: "Assistente de investigação que trabalha sobre as tuas fontes.",
    otter: "Transcrição e resumo automático de reuniões.",
    julius: "Análise de dados conversacional.",
    "canva-magic-studio": "Design gráfico assistido por IA dentro do Canva.",
    "figma-ai": "Prototipagem de interfaces com assistência de IA.",
    grammarly: "Corretor e editor de estilo assistido por IA.",
    "deepl-write": "Reescrita e melhoria de textos com qualidade nativa.",
  },
  ja: {
    chatgpt: "OpenAI の汎用会話アシスタント。",
    claude: "推論とコードに強い Anthropic のモデル。",
    gemini: "Google のエコシステムと統合されたアシスタント。",
    perplexity: "出典付きでリアルタイムに答える検索エンジン。",
    midjourney: "高品質なアート系画像の生成。",
    flux: "Black Forest Labs のオープンな画像モデル。",
    ideogram: "読みやすい文字を画像内に生成。",
    runway: "生成動画のためのクリエイティブスイート。",
    elevenlabs: "リアルな音声合成とボイスクローン。",
    suno: "テキストから完成した楽曲を生成。",
    cursor: "AI を組み込んだコードエディタ。",
    "github-copilot": "GitHub と IDE に統合されたコードアシスタント。",
    windsurf: "自動ワークフローを備えたエージェント型 IDE。",
    v0: "自然言語から React と Tailwind の UI を生成。",
    lovable: "説明するだけで本格的な Web アプリを作成。",
    bolt: "ブラウザ上でのフルスタック Web 開発。",
    "notion-ai": "Notion ワークスペースに統合された AI。",
    zapier: "数千のアプリ間の作業を自動化（AI 対応）。",
    make: "複雑なフローのビジュアル自動化。",
    jasper: "AI マーケティングコンテンツのプラットフォーム。",
    gamma: "AI で作るプレゼンとドキュメント。",
    notebooklm: "自分の資料をもとに回答するリサーチ支援。",
    otter: "会議の自動文字起こしと要約。",
    julius: "会話型のデータ分析。",
    "canva-magic-studio": "Canva 内の AI 支援グラフィックデザイン。",
    "figma-ai": "AI 支援による UI プロトタイピング。",
    grammarly: "AI による文法・文体チェック。",
    "deepl-write": "ネイティブ品質で文章をリライト。",
  },
};

export function translateCategoryName(slug: string, fallback: string, locale: Locale) {
  return categoryNames[locale]?.[slug] ?? fallback;
}

export function translateTagline(slug: string, fallback: string, locale: Locale) {
  return taglines[locale]?.[slug] ?? fallback;
}
