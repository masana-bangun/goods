import React, { useState, createContext, useContext } from "react";
import { View, SafeAreaView, Platform, StatusBar } from "react-native";
import TabBar from "./TabBar";
import HomeScreen from "./HomeScreen";
import NumerologyForm from "./NumerologyForm";
import NumerologyResults from "./NumerologyResults";
import NameGenerator from "./NameGenerator";
import CompatibilityChecker from "./CompatibilityChecker";
import MembershipPlans from "./MembershipPlans";
import AccountScreen from "./AccountScreen";
import LifeReport from "./LifeReport";

// Translation context
const TranslationContext = createContext({
  language: "en",
  setLanguage: (lang: string) => {},
  t: (key: string) => key,
});

export const useTranslation = () => useContext(TranslationContext);

// Translation data
const translations = {
  en: {
    // Home Screen
    welcome_back: "Welcome back,",
    all_premium_features_unlocked: "All Premium Features Unlocked!",
    quick_actions: "Quick Actions",
    name_analysis: "Name Analysis",
    love_couple: "Love Couple",
    dictio_name: "DictioName",
    generator_name_optimizer: "Generator Name Optimizer",
    lifeplan_report: "LifePlan Report",
    successful_people: "Successful people's",
    synchronize: "Synchronize",
    coherence: "Coherence",
    momentum: "Momentum",
    discover_power_names:
      "Discover the power of names through our comprehensive analysis tools. Want to have values like them? >> Learn More",
    earn_free_credits: "Earn Free Credits",
    share_with_friends: "Share with friends to unlock premium features",
    share_now: "Share Now",
    // Tab Bar
    home: "Home",
    analyze: "Analyze",
    names: "Names",
    match: "Match",
    account: "Account",
    // Common
    language: "Language",
    // Numerology Results
    hara: "Hara",
    expression: "Expression",
    time: "Time",
    dimensional_analysis: "Dimensional Analysis",
    synchronize_score: "Synchronize Score",
    coherence_value: "Coherence Value",
    synergize_value: "Synergize Value",
    productive_value: "Productive Value",
    momen_sukses_value: "Success Moment Value",
    grafologi_index: "Graphology Index",
    potential_suggestions: "Potential Suggestions",
    advanced_analysis: "Advanced Analysis",
    core_numbers: "Core Numbers",
    character_number: "Character Number",
    expression_number: "Expression Number",
    soul_number: "Soul Number",
    personality_number: "Personality Number",
    number_intensity: "Number Intensity",
    personal_development: "Personal Development",
    self_potential: "Self Potential",
    attitude_number: "Attitude Number",
    growth_number: "Growth Number",
    birth_date_analysis: "Birth Date Analysis",
    day: "Day",
    month: "Month",
    year: "Year",
    pythagorean_analysis: "Pythagorean Analysis",
    soul_urge: "Soul Urge",
    personality: "Personality",
    challenge_numbers: "Challenge Numbers",
    challenge: "Challenge",
    current_year_analysis: "Current Year Analysis",
    personal_year_number: "Personal Year Number",
    premium_analysis: "Premium Analysis",
    upgrade_to_premium: "Upgrade to Premium",
    parameter_detail: "Parameter Detail",
    close: "Close",
    // Numerology Form
    numerology_analysis: "Numerology Analysis",
    basic_analysis: "Basic Analysis",
    advanced_analysis: "Advanced Analysis",
    full_name: "Full Name",
    enter_full_name: "Enter your full name",
    normalized: "Normalized",
    gender: "Gender",
    male: "Male",
    female: "Female",
    birth_date: "Birth Date",
    select_birth_date: "Select Birth Date",
    cancel: "Cancel",
    done: "Done",
    advanced_analysis_features: "Advanced Analysis Features:",
    life_path_number: "• Life Path Number (Hara)",
    expression_number_feature: "• Expression Number",
    soul_urge_number: "• Soul Urge Number",
    personality_number_feature: "• Personality Number",
    maturity_number: "• Maturity Number",
    personal_year_number_feature: "• Personal Year Number",
    analyze: "Analyze",
    // Name Generator
    personal_name_optimizer: "Personal Name Optimizer",
    baby_name_generator: "Baby Name Generator",
    personal_name: "Personal Name",
    baby_name: "Baby Name",
    generation_mode: "Generation Mode",
    add_one_word: "Add One Word",
    add_some_word: "Add Some Word",
    your_first_name: "Your First Name",
    family_name_optional: "Family Name (Optional)",
    enter_first_name: "Enter your first name",
    enter_family_name: "Enter family name (optional)",
    name_origin: "Name Origin",
    generate_names: "Generate Names",
    advanced_search: "Advanced Search",
    jalankan_lanjut_combi: "Run/Continue Combi",
    suggested_names: "Suggested Names",
    generated_from: "Generated from:",
    no_matching_names: "No matching names found. Try different parameters.",
    // Compatibility Checker
    compatibility_checker: "Compatibility Checker",
    person_1: "Person 1",
    person_2: "Person 2",
    check_compatibility: "Check Compatibility",
    compatibility_results: "Compatibility Results",
    compatibility_areas: "Compatibility Areas",
    detailed_analysis_unlocked: "Detailed Analysis - Unlocked!",
    all_premium_features_available:
      "All premium features are now available for your compatibility analysis.",
    // Life Report
    life_report: "Life Report",
    life_path: "Life Path",
    year_life_report: "100 Year Life Report",
    daily_advice: "Daily Advice",
    daily_advice_calendar: "Daily Advice Calendar",
    select_date: "Select Date",
    monthly_advice_calendar: "Monthly Advice Calendar",
    legend: "Legend:",
    // G1-G9 Descriptions
    g1_desc:
      "Independent and leadership-oriented, with strong initiative and pioneering spirit. Natural born leader with creative abilities.",
    g2_desc:
      "Cooperative and diplomatic, excellent in partnerships and teamwork. Patient and detail-oriented with strong intuitive abilities.",
    g3_desc:
      "Creative and expressive, with strong communication skills. Artistic talents and optimistic outlook on life.",
    g4_desc:
      "Practical and organized, with strong work ethic and attention to detail. Reliable and systematic in approach.",
    g5_desc:
      "Freedom-loving and adventurous, with strong desire for variety and change. Dynamic and versatile personality.",
    g6_desc:
      "Nurturing and responsible, with strong family orientation. Caring and supportive with healing abilities.",
    g7_desc:
      "Analytical and introspective, with strong spiritual inclinations. Researcher and seeker of truth and wisdom.",
    g8_desc:
      "Ambitious and business-minded, with strong material focus. Natural organizer with executive abilities.",
    g9_desc:
      "Humanitarian and generous, with strong desire to serve others. Compassionate and understanding with universal outlook.",
  },
  fr: {
    // Home Screen
    welcome_back: "Bon retour,",
    all_premium_features_unlocked:
      "Toutes les fonctionnalités Premium débloquées !",
    quick_actions: "Actions rapides",
    name_analysis: "Analyse de nom",
    love_couple: "Couple amoureux",
    dictio_name: "DictioNom",
    generator_name_optimizer: "Optimiseur de générateur de noms",
    lifeplan_report: "Rapport de plan de vie",
    successful_people: "Personnes à succès",
    synchronize: "Synchroniser",
    coherence: "Cohérence",
    momentum: "Élan",
    discover_power_names:
      "Découvrez le pouvoir des noms grâce à nos outils d'analyse complets. Vous voulez avoir des valeurs comme eux ? >> En savoir plus",
    earn_free_credits: "Gagnez des crédits gratuits",
    share_with_friends:
      "Partagez avec des amis pour débloquer les fonctionnalités premium",
    share_now: "Partager maintenant",
    // Tab Bar
    home: "Accueil",
    analyze: "Analyser",
    names: "Noms",
    match: "Correspondance",
    account: "Compte",
    // Common
    language: "Langue",
    // Numerology Results
    hara: "Hara",
    expression: "Expression",
    time: "Temps",
    dimensional_analysis: "Analyse Dimensionnelle",
    synchronize_score: "Score de Synchronisation",
    coherence_value: "Valeur de Cohérence",
    synergize_value: "Valeur de Synergie",
    productive_value: "Valeur Productive",
    momen_sukses_value: "Valeur du Moment de Succès",
    grafologi_index: "Index Graphologique",
    potential_suggestions: "Suggestions Potentielles",
    advanced_analysis: "Analyse Avancée",
    core_numbers: "Nombres Fondamentaux",
    character_number: "Nombre de Caractère",
    expression_number: "Nombre d'Expression",
    soul_number: "Nombre d'Âme",
    personality_number: "Nombre de Personnalité",
    number_intensity: "Intensité des Nombres",
    personal_development: "Développement Personnel",
    self_potential: "Potentiel Personnel",
    attitude_number: "Nombre d'Attitude",
    growth_number: "Nombre de Croissance",
    birth_date_analysis: "Analyse de la Date de Naissance",
    day: "Jour",
    month: "Mois",
    year: "Année",
    pythagorean_analysis: "Analyse Pythagoricienne",
    soul_urge: "Élan de l'Âme",
    personality: "Personnalité",
    challenge_numbers: "Nombres de Défi",
    challenge: "Défi",
    current_year_analysis: "Analyse de l'Année Actuelle",
    personal_year_number: "Nombre d'Année Personnelle",
    premium_analysis: "Analyse Premium",
    upgrade_to_premium: "Passer au Premium",
    parameter_detail: "Détail du Paramètre",
    close: "Fermer",
    // Numerology Form
    numerology_analysis: "Analyse Numérologique",
    basic_analysis: "Analyse de Base",
    advanced_analysis: "Analyse Avancée",
    full_name: "Nom Complet",
    enter_full_name: "Entrez votre nom complet",
    normalized: "Normalisé",
    gender: "Genre",
    male: "Homme",
    female: "Femme",
    birth_date: "Date de Naissance",
    select_birth_date: "Sélectionner la Date de Naissance",
    cancel: "Annuler",
    done: "Terminé",
    advanced_analysis_features: "Fonctionnalités d'Analyse Avancée :",
    life_path_number: "• Nombre de Chemin de Vie (Hara)",
    expression_number_feature: "• Nombre d'Expression",
    soul_urge_number: "• Nombre d'Élan de l'Âme",
    personality_number_feature: "• Nombre de Personnalité",
    maturity_number: "• Nombre de Maturité",
    personal_year_number_feature: "• Nombre d'Année Personnelle",
    analyze: "Analyser",
    // Name Generator
    personal_name_optimizer: "Optimiseur de Nom Personnel",
    baby_name_generator: "Générateur de Nom de Bébé",
    personal_name: "Nom Personnel",
    baby_name: "Nom de Bébé",
    generation_mode: "Mode de Génération",
    add_one_word: "Ajouter Un Mot",
    add_some_word: "Ajouter Quelques Mots",
    your_first_name: "Votre Prénom",
    family_name_optional: "Nom de Famille (Optionnel)",
    enter_first_name: "Entrez votre prénom",
    enter_family_name: "Entrez le nom de famille (optionnel)",
    name_origin: "Origine du Nom",
    generate_names: "Générer des Noms",
    advanced_search: "Recherche Avancée",
    jalankan_lanjut_combi: "Exécuter/Continuer Combi",
    suggested_names: "Noms Suggérés",
    generated_from: "Généré à partir de :",
    no_matching_names:
      "Aucun nom correspondant trouvé. Essayez différents paramètres.",
    // Compatibility Checker
    compatibility_checker: "Vérificateur de Compatibilité",
    person_1: "Personne 1",
    person_2: "Personne 2",
    check_compatibility: "Vérifier la Compatibilité",
    compatibility_results: "Résultats de Compatibilité",
    compatibility_areas: "Domaines de Compatibilité",
    detailed_analysis_unlocked: "Analyse Détaillée - Débloquée !",
    all_premium_features_available:
      "Toutes les fonctionnalités premium sont maintenant disponibles pour votre analyse de compatibilité.",
    // Life Report
    life_report: "Rapport de Vie",
    life_path: "Chemin de Vie",
    year_life_report: "Rapport de Vie de 100 Ans",
    daily_advice: "Conseil Quotidien",
    daily_advice_calendar: "Calendrier de Conseils Quotidiens",
    select_date: "Sélectionner la Date",
    monthly_advice_calendar: "Calendrier de Conseils Mensuels",
    legend: "Légende :",
    // G1-G9 Descriptions
    g1_desc:
      "Indépendant et orienté leadership, avec une forte initiative et un esprit pionnier. Leader né avec des capacités créatives.",
    g2_desc:
      "Coopératif et diplomatique, excellent dans les partenariats et le travail d'équipe. Patient et attentif aux détails avec de fortes capacités intuitives.",
    g3_desc:
      "Créatif et expressif, avec de fortes compétences en communication. Talents artistiques et vision optimiste de la vie.",
    g4_desc:
      "Pratique et organisé, avec une forte éthique de travail et attention aux détails. Fiable et systématique dans l'approche.",
    g5_desc:
      "Épris de liberté et aventureux, avec un fort désir de variété et de changement. Personnalité dynamique et polyvalente.",
    g6_desc:
      "Nourricier et responsable, avec une forte orientation familiale. Attentionné et solidaire avec des capacités de guérison.",
    g7_desc:
      "Analytique et introspectif, avec de fortes inclinations spirituelles. Chercheur et quêteur de vérité et de sagesse.",
    g8_desc:
      "Ambitieux et orienté business, avec un fort focus matériel. Organisateur naturel avec des capacités exécutives.",
    g9_desc:
      "Humanitaire et généreux, avec un fort désir de servir les autres. Compatissant et compréhensif avec une vision universelle.",
  },
  es: {
    // Home Screen
    welcome_back: "Bienvenido de vuelta,",
    all_premium_features_unlocked:
      "¡Todas las funciones Premium desbloqueadas!",
    quick_actions: "Acciones rápidas",
    name_analysis: "Análisis de nombres",
    love_couple: "Pareja amorosa",
    dictio_name: "DictioNombre",
    generator_name_optimizer: "Optimizador generador de nombres",
    lifeplan_report: "Informe del plan de vida",
    successful_people: "Personas exitosas",
    synchronize: "Sincronizar",
    coherence: "Coherencia",
    momentum: "Impulso",
    discover_power_names:
      "Descubre el poder de los nombres a través de nuestras herramientas de análisis integral. ¿Quieres tener valores como ellos? >> Aprende más",
    earn_free_credits: "Gana créditos gratis",
    share_with_friends:
      "Comparte con amigos para desbloquear funciones premium",
    share_now: "Compartir ahora",
    // Tab Bar
    home: "Inicio",
    analyze: "Analizar",
    names: "Nombres",
    match: "Coincidencia",
    account: "Cuenta",
    // Common
    language: "Idioma",
    // Numerology Results
    hara: "Hara",
    expression: "Expresión",
    time: "Tiempo",
    dimensional_analysis: "Análisis Dimensional",
    synchronize_score: "Puntuación de Sincronización",
    coherence_value: "Valor de Coherencia",
    synergize_value: "Valor de Sinergia",
    productive_value: "Valor Productivo",
    momen_sukses_value: "Valor del Momento de Éxito",
    grafologi_index: "Índice Grafológico",
    potential_suggestions: "Sugerencias Potenciales",
    advanced_analysis: "Análisis Avanzado",
    core_numbers: "Números Centrales",
    character_number: "Número de Carácter",
    expression_number: "Número de Expresión",
    soul_number: "Número del Alma",
    personality_number: "Número de Personalidad",
    number_intensity: "Intensidad de Números",
    personal_development: "Desarrollo Personal",
    self_potential: "Potencial Personal",
    attitude_number: "Número de Actitud",
    growth_number: "Número de Crecimiento",
    birth_date_analysis: "Análisis de Fecha de Nacimiento",
    day: "Día",
    month: "Mes",
    year: "Año",
    pythagorean_analysis: "Análisis Pitagórico",
    soul_urge: "Impulso del Alma",
    personality: "Personalidad",
    challenge_numbers: "Números de Desafío",
    challenge: "Desafío",
    current_year_analysis: "Análisis del Año Actual",
    personal_year_number: "Número de Año Personal",
    premium_analysis: "Análisis Premium",
    upgrade_to_premium: "Actualizar a Premium",
    parameter_detail: "Detalle del Parámetro",
    close: "Cerrar",
    // Numerology Form
    numerology_analysis: "Análisis Numerológico",
    basic_analysis: "Análisis Básico",
    advanced_analysis: "Análisis Avanzado",
    full_name: "Nombre Completo",
    enter_full_name: "Ingrese su nombre completo",
    normalized: "Normalizado",
    gender: "Género",
    male: "Masculino",
    female: "Femenino",
    birth_date: "Fecha de Nacimiento",
    select_birth_date: "Seleccionar Fecha de Nacimiento",
    cancel: "Cancelar",
    done: "Hecho",
    advanced_analysis_features: "Características del Análisis Avanzado:",
    life_path_number: "• Número de Camino de Vida (Hara)",
    expression_number_feature: "• Número de Expresión",
    soul_urge_number: "• Número de Impulso del Alma",
    personality_number_feature: "• Número de Personalidad",
    maturity_number: "• Número de Madurez",
    personal_year_number_feature: "• Número de Año Personal",
    analyze: "Analizar",
    // Name Generator
    personal_name_optimizer: "Optimizador de Nombre Personal",
    baby_name_generator: "Generador de Nombres de Bebé",
    personal_name: "Nombre Personal",
    baby_name: "Nombre de Bebé",
    generation_mode: "Modo de Generación",
    add_one_word: "Agregar Una Palabra",
    add_some_word: "Agregar Algunas Palabras",
    your_first_name: "Su Primer Nombre",
    family_name_optional: "Apellido (Opcional)",
    enter_first_name: "Ingrese su primer nombre",
    enter_family_name: "Ingrese apellido (opcional)",
    name_origin: "Origen del Nombre",
    generate_names: "Generar Nombres",
    advanced_search: "Búsqueda Avanzada",
    jalankan_lanjut_combi: "Ejecutar/Continuar Combi",
    suggested_names: "Nombres Sugeridos",
    generated_from: "Generado desde:",
    no_matching_names:
      "No se encontraron nombres coincidentes. Pruebe diferentes parámetros.",
    // Compatibility Checker
    compatibility_checker: "Verificador de Compatibilidad",
    person_1: "Persona 1",
    person_2: "Persona 2",
    check_compatibility: "Verificar Compatibilidad",
    compatibility_results: "Resultados de Compatibilidad",
    compatibility_areas: "Áreas de Compatibilidad",
    detailed_analysis_unlocked: "Análisis Detallado - ¡Desbloqueado!",
    all_premium_features_available:
      "Todas las características premium están ahora disponibles para su análisis de compatibilidad.",
    // Life Report
    life_report: "Informe de Vida",
    life_path: "Camino de Vida",
    year_life_report: "Informe de Vida de 100 Años",
    daily_advice: "Consejo Diario",
    daily_advice_calendar: "Calendario de Consejos Diarios",
    select_date: "Seleccionar Fecha",
    monthly_advice_calendar: "Calendario de Consejos Mensuales",
    legend: "Leyenda:",
    // G1-G9 Descriptions
    g1_desc:
      "Independiente y orientado al liderazgo, con fuerte iniciativa y espíritu pionero. Líder nato con habilidades creativas.",
    g2_desc:
      "Cooperativo y diplomático, excelente en asociaciones y trabajo en equipo. Paciente y detallista con fuertes habilidades intuitivas.",
    g3_desc:
      "Creativo y expresivo, con fuertes habilidades de comunicación. Talentos artísticos y perspectiva optimista de la vida.",
    g4_desc:
      "Práctico y organizado, con fuerte ética de trabajo y atención al detalle. Confiable y sistemático en el enfoque.",
    g5_desc:
      "Amante de la libertad y aventurero, con fuerte deseo de variedad y cambio. Personalidad dinámica y versátil.",
    g6_desc:
      "Nutritivo y responsable, con fuerte orientación familiar. Cariñoso y solidario con habilidades curativas.",
    g7_desc:
      "Analítico e introspectivo, con fuertes inclinaciones espirituales. Investigador y buscador de verdad y sabiduría.",
    g8_desc:
      "Ambicioso y orientado a los negocios, con fuerte enfoque material. Organizador natural con habilidades ejecutivas.",
    g9_desc:
      "Humanitario y generoso, con fuerte deseo de servir a otros. Compasivo y comprensivo con perspectiva universal.",
  },
  ar: {
    // Home Screen
    welcome_back: "مرحباً بعودتك،",
    all_premium_features_unlocked: "تم إلغاء قفل جميع الميزات المميزة!",
    quick_actions: "إجراءات سريعة",
    name_analysis: "تحليل الأسماء",
    love_couple: "زوجان محبان",
    dictio_name: "قاموس الأسماء",
    generator_name_optimizer: "محسن مولد الأسماء",
    lifeplan_report: "تقرير خطة الحياة",
    successful_people: "الأشخاص الناجحون",
    synchronize: "مزامنة",
    coherence: "تماسك",
    momentum: "زخم",
    discover_power_names:
      "اكتشف قوة الأسماء من خلال أدوات التحليل الشاملة لدينا. تريد أن تحصل على قيم مثلهم؟ >> تعلم المزيد",
    earn_free_credits: "احصل على نقاط مجانية",
    share_with_friends: "شارك مع الأصدقاء لإلغاء قفل الميزات المميزة",
    share_now: "شارك الآن",
    // Tab Bar
    home: "الرئيسية",
    analyze: "تحليل",
    names: "أسماء",
    match: "مطابقة",
    account: "حساب",
    // Common
    language: "اللغة",
    // Parameter Details
    hara_1_desc: "🤠إيجابي في الاستقلالية والاستقلال، التطوير (الأولي) الجديد",
    hara_2_desc: "🤝تحسين الاتصال والتعاون، بمساعدة علاقة تسير بشكل جيد وطويل",
    hara_3_desc:
      "💡إمكانات الأفكار والإبداع، الطبيعة المريحة والاستمتاع بكل الأشياء التي تحتاج إلى السيطرة عليها",
    hara_4_desc:
      "✔️إمكانات المهنة والعلاقات التي تقوى، الانتقال للمضي قدماً، المسؤوليات تُحل بطريقة عملية",
    hara_5_desc:
      "إيجابي في الحركة والموارد، لكن احذر من ❌جميع الإمكانات السيئة؛ سوء الحظ، سهولة الخداع، الخيانة، المصيبة، المرض، النهاية السيئة",
    hara_6_desc:
      "🏡إمكانية التطور في الأمور العائلية، الاجتماعية، مساعدة الكبار والصغار، التحسين، الشفاء، التقدم",
    hara_7_desc:
      "متأمل😠إمكانية مشاكل مالية، صراع عاطفي (تظهر المصيبة)، تردد، اضطراب عصبي، خلايا غير طبيعية",
    hara_8_desc:
      "🤕إمكانية المصيبة، المرض (شفاء طويل)، تشخيص خاطئ، إنهاء شيء بطريقة سيئة (تأثير خطير)",
    hara_9_desc:
      "🤧إمكانية اضطراب مالي، اضطراب دوائي، صحة ضعيفة، النهاية (أي شيء) بسبب فعل طرف آخر",
    hara_11_desc:
      "🤢إمكانية فشل الأعمال، أن تصبح كبش فداء، ضغط نفسي، مضاعفات، انفصال بسبب اختلاف المبادئ، اضطرابات صحية",
    hara_13_desc:
      "😳إمكانية خيبة أمل من النتائج (إفلاس، خسارة) في الأسرة والأعمال، خيانة من أشخاص مقربين",
    expression_1_desc:
      "أنت مقدر لتكون قائداً في مجال عملك. يجب أن تتعلم الاعتماد على قدراتك الخاصة، وتظهر الشجاعة والعزيمة وتتجنب الجوانب السلبية مثل الأنانية وحب الذات. سينظر إليك الناس للحصول على التوجيه والإرشاد من وقت لآخر ويجب أن تكون مستعداً لذلك. وُلدت لتصبح شخصاً متميزاً في مجال عمل في هذه الحياة.",
    expression_2_desc:
      "التعاون والدبلوماسية والتعايش السلمي هي أهداف الحياة. التطوير يحدث في الشراكات بدلاً من الاستقلالية. قد تُدعى للتحكيم وصنع السلام من وقت لآخر. التعاون والمشاركة والارتباط سيجلب لك النجاح. إذا تمكنت من تجنب الجوانب السلبية، يجب أن تُعرف كصانع سلام.",
    expression_3_desc:
      "الشعبية والسعادة للذات والآخرين والحب والرومانسية والممتلكات المادية هي السمات البارزة للحياة، بشرط الاستخدام الإيجابي للموهبة. أنت معطي الفرح للآخرين ووُلدت لتجعل الآخرين سعداء. من خلال الخيال والإخلاص والبهجة، أنت مقدر لتظهر النور للإنسانية في خط من الإبداع.",
    expression_4_desc:
      "أنت مقدر لتحمل المسؤولية وسيعتمد عليك الآخرون للمساعدة والدعم. البناء والتنظيم والإدارة ستبقيك مشغولاً لبقية حياتك. في كثير من الأحيان ستأتي إليك مشاكل الأقارب، وقيود الحياة قد تزعجك. من خلال الصبر والعزيمة والنظام والإخلاص والصدق والخدمة ستوفر الأمان للآخرين ولنفسك إذا تم التغلب على الجوانب السلبية.",
    expression_5_desc:
      "وُلدت للتعامل مع الناس بشكل عام ولتعزيز 'الحرية' و'التقدم'. التغيير والظروف الجديدة والمناهج الجديدة والتنوع والتعدد والأحداث غير المتوقعة ستكون السمات البارزة لحياتك. قد تجد صعوبة في العمل على نفس الخطوط أو مع نفس الأشخاص لفترة طويلة. ستعلم الناس تحقيق 'الحرية' والعيش بسعادة، إذا تم السيطرة على السلبية.",
    expression_6_desc:
      "جئت إلى هذا العالم لخدمة الإنسانية بالحب والواجب والمسؤولية والأعمال الخيرية. ستُعرف كشخص يمكن الاعتماد عليه. يجب أن تكون كريماً مع الأقارب ولكن ليس إلى حد التضحية. سيطرق الناس بابك للمساعدة طوال حياتك وكلما فعلت أكثر للآخرين، كلما أحاطك المزيد من الحب والراحة والمال. لتقدمك الشخصي تحتاج إلى الجمال والرفقة والحب والانسجام. أنت قادر على استكشاف فلسفة الحياة وتحقيق المرتفعات الروحية.",
    expression_7_desc:
      "أنت مقدر للبحث عن الحكمة أو الحقائق المخفية في المجال العلمي أو الجنائي أو الفلسفي أو الديني. قد تجد نفسك وحيداً حتى عندما تكون وسط الناس وقد تكون خارج الطبقة العادية. قد تتعمق في فلسفة الحياة؛ تجرب وتختبر وتبرهن الحقائق التي اكتشفها آخرون. الشعبية والحب والاحترام يجب أن تأتي إليك للمعرفة المكتسبة ويجب أن تُعرف كمعلم. الأعمال الشخصية والحب وحتى الزواج قد يُضحى بها في الطريق الصعب الذي تتبعه، لكنك قد تحصل على رضا أكبر في العثور على الحقيقة (غالباً في الخطوط الغامضة أو الروحية) وتعليم الناس.",
    expression_8_desc:
      "الإدارة والتنظيم والإدارة يجب أن تقودك إلى منصب سلطة واعتراف. سيتعين عليك إجراء تقييم مناسب للأشخاص والأحداث من وقت لآخر، وهذه ليست مهمة سهلة. إذا تم تطوير الملكة الفلسفية وتم إصدار حكم غير متحيز، فإن مكافأتك ستكون إنجازها. المال قد لا يكون دائماً خطوط التطوير بالإضافة إلى الأعمال التي قد تشتهر بها.",
    expression_9_desc:
      "أنت مقدر لتكون شعبياً في خط من الأعمال الخيرية أو الإنسانية أو الخيرية. حب الأخوة وخدمة البشرية ستكون جزءاً من شخصيتك، من ناحية بينما الحب والرومانسية والموسيقى والفن يجب أن تهتم بك بعمق من ناحية أخرى. الرحمة والكرم وفهم احتياجات الآخرين ستجعلك شعبياً جداً. الأنانية والحب الشخصي وعدم المغفرة يمكن أن تثبت ضررها وتجلب خيبات الأمل. كونك غير شخصي وتطوير الحب العالمي يمكن أن يجعلك قائداً روحياً.",
    expression_11_desc:
      "الإلهام والوعي الروحي (غالباً كامن) والحدس والقدرة النفسية يمكن أن تؤدي إلى السعادة الداخلية والاستنارة إذا تم السيطرة على الجوانب السلبية لجميعها. أنت مقدر لتحقيق قيم أعلى للحياة؛ والحياة العائلية والمكاسب المادية والمكانة الاجتماعية قد تُفقد بسهولة إذا تم الالتزام بها بصرامة. يجب أن تتغلب على الحساسية والعصبية والتمركز حول الذات وتأخذ الحياة المادية والاجتماعية بخفة فقط. أنت مُنحت قوى تحقيق المرتفعات الروحية لنفسك وإظهار النور للآخرين. أحياناً تعاني بسبب الخسارة المادية مما يؤدي إلى خيبات أمل متكررة في العلاقات والشراكات.",
    expression_22_desc:
      "القدرة على التعامل مع المشاريع الكبيرة بكفاءة من المحتمل أن تضعك في منصب سلطة في خط عمل واحد في العالم المادي في نقطة ما من الحياة. من المحتمل أن تحصل على مشاريع مهمة في الحياة. لكن الإنجاز سيعتمد على فحصك للرغبة في 'أخذ عمل أكثر مما يمكنك التعامل معه' و'إبقاء الوعي الروحي من التدخل في النهج العملي'. من ناحية أخرى إذا كنت تميل للعمل في الخطوط الصوفية والغامضة قد تفعل الكثير من الخير للآخرين وتصبح مشهوراً كمعطي نور.",
    // Numerology Results
    hara: "هارا",
    expression: "التعبير",
    time: "الوقت",
    dimensional_analysis: "التحليل الأبعادي",
    synchronize_score: "نقاط المزامنة",
    coherence_value: "قيمة التماسك",
    synergize_value: "قيمة التآزر",
    productive_value: "القيمة الإنتاجية",
    momen_sukses_value: "قيمة لحظة النجاح",
    grafologi_index: "مؤشر الخط",
    potential_suggestions: "اقتراحات محتملة",
    advanced_analysis: "تحليل متقدم",
    core_numbers: "الأرقام الأساسية",
    character_number: "رقم الشخصية",
    expression_number: "رقم التعبير",
    soul_number: "رقم الروح",
    personality_number: "رقم الشخصية",
    number_intensity: "كثافة الأرقام",
    personal_development: "التطوير الشخصي",
    self_potential: "الإمكانات الذاتية",
    attitude_number: "رقم الموقف",
    growth_number: "رقم النمو",
    birth_date_analysis: "تحليل تاريخ الميلاد",
    day: "يوم",
    month: "شهر",
    year: "سنة",
    pythagorean_analysis: "التحليل الفيثاغوري",
    soul_urge: "دافع الروح",
    personality: "الشخصية",
    challenge_numbers: "أرقام التحدي",
    challenge: "تحدي",
    current_year_analysis: "تحليل السنة الحالية",
    personal_year_number: "رقم السنة الشخصية",
    premium_analysis: "تحليل مميز",
    upgrade_to_premium: "الترقية إلى المميز",
    parameter_detail: "تفاصيل المعامل",
    close: "إغلاق",
    // Numerology Form
    numerology_analysis: "التحليل العددي",
    basic_analysis: "تحليل أساسي",
    advanced_analysis: "تحليل متقدم",
    full_name: "الاسم الكامل",
    enter_full_name: "أدخل اسمك الكامل",
    normalized: "مُطبع",
    gender: "الجنس",
    male: "ذكر",
    female: "أنثى",
    birth_date: "تاريخ الميلاد",
    select_birth_date: "اختر تاريخ الميلاد",
    cancel: "إلغاء",
    done: "تم",
    advanced_analysis_features: "ميزات التحليل المتقدم:",
    life_path_number: "• رقم مسار الحياة (هارا)",
    expression_number_feature: "• رقم التعبير",
    soul_urge_number: "• رقم دافع الروح",
    personality_number_feature: "• رقم الشخصية",
    maturity_number: "• رقم النضج",
    personal_year_number_feature: "• رقم السنة الشخصية",
    analyze: "تحليل",
    // Name Generator
    personal_name_optimizer: "محسن الاسم الشخصي",
    baby_name_generator: "مولد أسماء الأطفال",
    personal_name: "اسم شخصي",
    baby_name: "اسم طفل",
    generation_mode: "وضع التوليد",
    add_one_word: "إضافة كلمة واحدة",
    add_some_word: "إضافة بعض الكلمات",
    your_first_name: "اسمك الأول",
    family_name_optional: "اسم العائلة (اختياري)",
    enter_first_name: "أدخل اسمك الأول",
    enter_family_name: "أدخل اسم العائلة (اختياري)",
    name_origin: "أصل الاسم",
    generate_names: "توليد الأسماء",
    advanced_search: "بحث متقدم",
    jalankan_lanjut_combi: "تشغيل/متابعة كومبي",
    suggested_names: "أسماء مقترحة",
    generated_from: "مُولد من:",
    no_matching_names: "لم يتم العثور على أسماء مطابقة. جرب معاملات مختلفة.",
    // Compatibility Checker
    compatibility_checker: "فاحص التوافق",
    person_1: "الشخص 1",
    person_2: "الشخص 2",
    check_compatibility: "فحص التوافق",
    compatibility_results: "نتائج التوافق",
    compatibility_areas: "مجالات التوافق",
    detailed_analysis_unlocked: "تحليل مفصل - مفتوح!",
    all_premium_features_available:
      "جميع الميزات المميزة متاحة الآن لتحليل التوافق الخاص بك.",
    // Life Report
    life_report: "تقرير الحياة",
    life_path: "مسار الحياة",
    year_life_report: "تقرير حياة 100 سنة",
    daily_advice: "نصيحة يومية",
    daily_advice_calendar: "تقويم النصائح اليومية",
    select_date: "اختر التاريخ",
    monthly_advice_calendar: "تقويم النصائح الشهرية",
    legend: "وسيلة الإيضاح:",
    // G1-G9 Descriptions
    g1_desc:
      "مستقل وموجه نحو القيادة، مع مبادرة قوية وروح رائدة. قائد بالفطرة مع قدرات إبداعية.",
    g2_desc:
      "تعاوني ودبلوماسي، ممتاز في الشراكات والعمل الجماعي. صبور ومهتم بالتفاصيل مع قدرات حدسية قوية.",
    g3_desc:
      "مبدع ومعبر، مع مهارات تواصل قوية. مواهب فنية ونظرة متفائلة للحياة.",
    g4_desc:
      "عملي ومنظم، مع أخلاقيات عمل قوية واهتمام بالتفاصيل. موثوق ومنهجي في النهج.",
    g5_desc:
      "محب للحرية ومغامر، مع رغبة قوية في التنوع والتغيير. شخصية ديناميكية ومتعددة الاستخدامات.",
    g6_desc: "مغذي ومسؤول، مع توجه عائلي قوي. مهتم وداعم مع قدرات شفائية.",
    g7_desc: "تحليلي وتأملي، مع ميول روحية قوية. باحث وساعي للحقيقة والحكمة.",
    g8_desc:
      "طموح وموجه نحو الأعمال، مع تركيز مادي قوي. منظم طبيعي مع قدرات تنفيذية.",
    g9_desc:
      "إنساني وكريم، مع رغبة قوية في خدمة الآخرين. رحيم ومتفهم مع نظرة عالمية.",
    // Time Descriptions
    time_1_desc:
      "مليء بالأفكار الإبداعية، قوي الإرادة، مستقل، شجاع، ومليء بالنضال. النقص المحمول هو العناد والكذب والرغبة في الهيمنة والأنانية التي تجعل الذات تشعر بمعرفة كل شيء. الحكمة هي التركيز الرئيسي. يمتلك تحليلاً قوياً. إذا استُخدم بشكل صحيح، سيصبح شخصاً متعلماً. عادة لا يجيب فوراً بنعم أو لا، سيفكر أولاً. مفصل جداً في أشياء كثيرة. قوي جداً في الإبداع ومتيقظ جداً. هذه الشخصية ستقود إلى إنتاج الثروة. ماهر في الترفيه وموثوق في بناء العلاقات. الثروة عادة تُحقق حوالي سن 32 إلى 42. يمتلك مهارات قيادية. الجنس الآخر كثيرون مهتمون. سيبدو أفضل أو أجمل مع تقدم العمر - فوق الثلاثينات وما بعدها، سيبدو أكثر وسامة. الجانب السلبي هو الشعور بالوحدة كثيراً، الشعور بأنه متجول. كن حذراً عند تحليل شخص أو موقف، التحليل الخاطئ سيؤدي إلى مشاكل لا يجب أن تحدث.",
    time_2_desc:
      "مليء بالسلام، متواضع، ودود، وله تأثير روحي. النقص المحمول هو المشاعر الحساسة وسهولة الجرح، الاهتمام المفرط بالأشياء الصغيرة حتى يضيع الكثير من الوقت. ماهر ويمتلك شخصية ممتعة وكثير الكلام. موثوق في العمل المتعلق بالتعاون. هادئ جداً، ودود، ولطيف القلب. يؤكد دائماً على النظافة والنظام ومنظم جداً. مستعد للعمل بجد، ناضج جداً في طريقة تفكيره. معتاد على التعامل مع أشخاص أكبر سناً. يمتلك القدرة على التوجيه وإنجاز العمل. الجانب السلبي هو الرغبة في الاستماع لآراء الآخرين، لكن ربما ليس لاتباعها. عنيد، يثير الكثير من الكلام السيء ويميل إلى 'مجرد الكلام فقط'. غيور جداً في مسائل الحب.",
    time_3_desc:
      "مليء بالمواهب الفنية، روح النضال، يمتلك القدرة على رؤية 3 أزمنة. النقص المحمول هو طبيعة الإسراف، الكلام المتحرر، صعوبة المغفرة. جذاب وطويل التفكير، لكن غير صبور جداً. واضح ويعرف ما يريد ويعرف كيف وأين يحصل عليه. سريع جداً في التمييز بين الجيد والسيء. يمكن أن يشغل منصباً عالياً، غني ومزدهر. حياة جيدة في عيون المجتمع. يمتلك القدرة والموهبة وماهر في الاستفادة من الموقف. سريع الغضب، لكن أيضاً سريع الهدوء. امرأة جميلة، أو رجل وسيم في سن مبكرة. الجانب السلبي هو الميل إلى تبسيط كل شيء وعدم الحزم. أحياناً يمكن أن يكون مؤذياً. أحياناً قاسي عند التحدث. هناك مد وجزر في الزواج، وإذا لم يحافظ عليه جيداً قد يجلب الكارثة والعنف. عادة يعتقد أن الذات محقة في أي شيء يفعله ويقوله، بينما الآخرون مخطئون.",
    time_4_desc:
      "مليء بالمسؤولية، التفكير العلمي، الصدق والإخلاص. النقص المحمول هو العناد، حب الجدال والرغبة في الهيمنة، طبيعة مدمن العمل. ذكي، فني ومتفوق في امتحانات الحياة. جدير بالثقة وسهل التعامل في المجتمع. مليء بالرحمة وكاريزمي. بطبيعته مخطط ومفكر، يفكر قبل أن يتصرف. يحب السفر وعيش نمط حياة حر. يمتلك القدرة في سن صغيرة جداً. قادر على النهوض بسرعة بعد المرور بصعوبات الحياة. إذا كانت امرأة، تدلل شريكها. الجانب السلبي هو الضعف في جمع الثروة. يجب أن يكون حذراً في العلاقات أو الزواج، وإلا سيتورط في حوادث سيئة غير ضرورية.",
    time_5_desc:
      "مليء بطاقة الجنسانية، حب الحرية والتغيير، مليء بالعقل والأفعال السريعة، قادر على الترفيه. النقص المحمول هو عدم الإخلاص في 'الحب والزواج'، وعدم القدرة على السيطرة على القلق وعدم الرضا. يمتلك شخصية قوية جداً. وُلد بروح قيادية، عادة يمتلك منصباً فوق كثير من الناس في العمل. يمتلك غريزة قوية في أشياء كثيرة. واقعي وعامل جاد. يمكنه التكيف والتأقلم مع الموقف أو الظروف الحالية. رغم مواجهة عقبات الحياة، لكن إذا واجه مشاكل مالية دائماً هناك طريقة للتغلب عليها. الجانب السلبي هو إذا جاء من عائلة أقل حظاً، يمتلك طبيعة عنيدة. إذا كان في الطريق الخطأ، يميل إلى الدوران ليس لأهداف جيدة، حتى يميل إلى الكذب. انتقائي جداً ومتذمر لأشياء ومشاكل كثيرة. تعلم ألا تكون كذلك حتى يقدرك الناس أكثر.",
    time_6_desc:
      "مليء بالتوازن، لا يفكر في النفس، يحب الأنشطة الإنسانية، مخلص وثابت في التفكير في رفاهية الآخرين. النقص المحمول هو حب المدح والشعبية، عدم القدرة على السيطرة على الذات في التضحية. مثابر، ماهر في السيطرة على الثروة والرفاهية. مهذب جداً وذو ذوق عالي. يمتلك مهنة جيدة في الفن أو الدين أو التعليم. يمكن أن يصبح شخصية شعبية إلى حد ما. لا يستمع بسهولة للآخرين خاصة الرؤساء، لكن يفكر ويهتم بالمرؤوسين. يعتني بالعائلة والأقارب المقربين. موجه نحو العائلة. الجانب السلبي هو الغرور والفخر، عدم الرغبة في القيام بعمل بسيط. في مسائل العلاقات، يكون متملكاً ويريد دائماً السيطرة على كل شخص وكل شيء، لكن عادة لن يعترف. تخلص من موقف الرغبة في الهيمنة حتى يحبك الشخص المحبوب أكثر.",
    time_7_desc:
      "مليء بالذكاء، الوحدة، الصوفية، شخصية مليئة بالجاذبية. النقص المحمول هو صعوبة التعبير عن الذات، عدم الثقة بالآخرين، الاهتمام المفرط بالذات بحيث يفتقر إلى الفهم لاحتياجات 'الشريك'. مفصل في إدارة أشياء مختلفة. لن ينسى أبداً أي شخص ساعد من قبل. قادر على التغيير والانعطاف في موقف. يحب مطاردة الشهرة والحظ. موثوق في إدارة مجال الترفيه. يمكن أن يصبح شخصية روحية/قائد ديني، عادة في الخمسينات فما فوق. الجانب السلبي هو حب الجدال، عدم الحزم/تغيير الرأي كثيراً وعدم سرعة اتخاذ القرارات. يميل إلى مشاكل في الزواج. رغم كونه ماهراً في الشكر، هناك ميل أن الذات قد لا تظهر الامتنان للآخرين.",
    time_8_desc:
      "مليء بالمثالية، المادية، حارس أسرار موثوق. النقص المحمول هو الرغبة في إظهار القوة، نقص الإنسانية والعناد. تقريباً جميع الأشخاص مع الوقت 8 يحصلون على مأساة كنتيجة نهائية. صامت، محافظ، يميل إلى السلبية، لكن متحمس بين الآخرين. مسؤول جداً، رغم الشعور بالضغط أحياناً. مليء بالفضيلة وجدير بالثقة. لن يلعب بالناس. يبدو قاسياً من الخارج، لكن في الحقيقة لطيف من الداخل. الجانب السلبي هو الغضب، حب التأجيل والميل إلى الانتظار أو المراقبة. غالباً سيجعل يفقد الفرص. يحتاج إلى أن يكون أكثر ذكاءً في رؤية الموقف. كونه حذراً جداً لن يحصل على أي شيء. ثق في وجهة نظرك الخاصة وافعل شيئاً بطريقتك الخاصة. أحياناً غير واضح مع ما يعمل عليه. إذا كان في الطريق الخطأ، فسيصبح متنمراً، يريد الهيمنة، أناني، قاسي ويفكر فقط في تقدم نفسه.",
    time_9_desc:
      "مليء بالإنسانية، الكرم، الحب، والروح الروحية. النقص المحمول هو كونه حساساً جداً، متسرعاً في اتخاذ القرارات، أناني، متملك، غير متسامح وحتى غشاش. متفائل جداً ومنفتح الذهن. يحب أن يبدو جميلاً/أنيقاً ويرتدي ملابس جيدة. بسيط، يبدو قاسياً لكن لطيف من الداخل. متيقظ جداً وحساس. يعرف متى وكيف يهاجم ويدافع. ماهر في كسب قلوب الآخرين. يفعل كل شيء بسرعة لكن أقل تفصيلاً. عاطفي إلى حد ما. موثوق في العمل. يمتلك أهدافاً وأحلاماً كبيرة. أي شيء يفعله غالباً ما ينجح أكثر من عدم النجاح. الجانب السلبي هو الشعور بالوحدة كثيراً في الشيخوخة. هناك مستوى عالي من الجشع في الذات. يميل إلى نسيان الاهتمام بالمرؤوسين. ليس لديه أصدقاء حقيقيون كثيرون. نمط الحياة يميل إلى المادية.",
  },
  zh: {
    // Home Screen
    welcome_back: "欢迎回来，",
    all_premium_features_unlocked: "所有高级功能已解锁！",
    quick_actions: "快速操作",
    name_analysis: "姓名分析",
    love_couple: "恋人情侣",
    dictio_name: "姓名词典",
    generator_name_optimizer: "姓名生成器优化器",
    lifeplan_report: "人生规划报告",
    successful_people: "成功人士",
    synchronize: "同步",
    coherence: "连贯性",
    momentum: "动力",
    discover_power_names:
      "通过我们全面的分析工具发现姓名的力量。想要拥有像他们一样的价值观吗？>> 了解更多",
    earn_free_credits: "赚取免费积分",
    share_with_friends: "与朋友分享以解锁高级功能",
    share_now: "立即分享",
    // Tab Bar
    home: "首页",
    analyze: "分析",
    names: "姓名",
    match: "匹配",
    account: "账户",
    // Common
    language: "语言",
    // Numerology Results
    hara: "哈拉",
    expression: "表达",
    time: "时间",
    dimensional_analysis: "维度分析",
    synchronize_score: "同步分数",
    coherence_value: "连贯性值",
    synergize_value: "协同值",
    productive_value: "生产力值",
    momen_sukses_value: "成功时刻值",
    grafologi_index: "笔迹学指数",
    potential_suggestions: "潜在建议",
    advanced_analysis: "高级分析",
    core_numbers: "核心数字",
    character_number: "性格数字",
    expression_number: "表达数字",
    soul_number: "灵魂数字",
    personality_number: "个性数字",
    number_intensity: "数字强度",
    personal_development: "个人发展",
    self_potential: "自我潜能",
    attitude_number: "态度数字",
    growth_number: "成长数字",
    birth_date_analysis: "出生日期分析",
    day: "日",
    month: "月",
    year: "年",
    pythagorean_analysis: "毕达哥拉斯分析",
    soul_urge: "灵魂冲动",
    personality: "个性",
    challenge_numbers: "挑战数字",
    challenge: "挑战",
    current_year_analysis: "当前年份分析",
    personal_year_number: "个人年数字",
    premium_analysis: "高级分析",
    upgrade_to_premium: "升级到高级版",
    parameter_detail: "参数详情",
    close: "关闭",
    // Numerology Form
    numerology_analysis: "数字学分析",
    basic_analysis: "基础分析",
    advanced_analysis: "高级分析",
    full_name: "全名",
    enter_full_name: "输入您的全名",
    normalized: "标准化",
    gender: "性别",
    male: "男性",
    female: "女性",
    birth_date: "出生日期",
    select_birth_date: "选择出生日期",
    cancel: "取消",
    done: "完成",
    advanced_analysis_features: "高级分析功能：",
    life_path_number: "• 生命路径数字（哈拉）",
    expression_number_feature: "• 表达数字",
    soul_urge_number: "• 灵魂冲动数字",
    personality_number_feature: "• 个性数字",
    maturity_number: "• 成熟数字",
    personal_year_number_feature: "• 个人年数字",
    analyze: "分析",
    // Name Generator
    personal_name_optimizer: "个人姓名优化器",
    baby_name_generator: "婴儿姓名生成器",
    personal_name: "个人姓名",
    baby_name: "婴儿姓名",
    generation_mode: "生成模式",
    add_one_word: "添加一个词",
    add_some_word: "添加一些词",
    your_first_name: "您的名字",
    family_name_optional: "姓氏（可选）",
    enter_first_name: "输入您的名字",
    enter_family_name: "输入姓氏（可选）",
    name_origin: "姓名来源",
    generate_names: "生成姓名",
    advanced_search: "高级搜索",
    jalankan_lanjut_combi: "运行/继续组合",
    suggested_names: "建议姓名",
    generated_from: "生成自：",
    no_matching_names: "未找到匹配的姓名。请尝试不同的参数。",
    // Compatibility Checker
    compatibility_checker: "兼容性检查器",
    person_1: "人员1",
    person_2: "人员2",
    check_compatibility: "检查兼容性",
    compatibility_results: "兼容性结果",
    compatibility_areas: "兼容性领域",
    detailed_analysis_unlocked: "详细分析 - 已解锁！",
    all_premium_features_available: "您的兼容性分析现在可以使用所有高级功能。",
    // Life Report
    life_report: "生活报告",
    life_path: "生命路径",
    year_life_report: "100年生活报告",
    daily_advice: "每日建议",
    daily_advice_calendar: "每日建议日历",
    select_date: "选择日期",
    monthly_advice_calendar: "每月建议日历",
    legend: "图例：",
    // G1-G9 Descriptions
    g1_desc:
      "独立且具有领导导向，具有强烈的主动性和开拓精神。天生的领导者，具有创造能力。",
    g2_desc:
      "合作且外交，在伙伴关系和团队合作方面表现出色。耐心且注重细节，具有强烈的直觉能力。",
    g3_desc:
      "富有创造力和表现力，具有强烈的沟通技巧。艺术天赋和对生活的乐观态度。",
    g4_desc:
      "实用且有组织，具有强烈的工作道德和对细节的关注。可靠且方法系统化。",
    g5_desc:
      "热爱自由且富有冒险精神，对多样性和变化有强烈渴望。动态且多才多艺的个性。",
    g6_desc: "养育且负责任，具有强烈的家庭导向。关怀且支持，具有治愈能力。",
    g7_desc: "分析且内省，具有强烈的精神倾向。研究者和真理与智慧的寻求者。",
    g8_desc:
      "雄心勃勃且以商业为导向，具有强烈的物质焦点。天生的组织者，具有执行能力。",
    g9_desc:
      "人道主义且慷慨，具有强烈的服务他人的愿望。富有同情心和理解力，具有普世观。",
  },
  hi: {
    // Home Screen
    welcome_back: "वापसी पर स्वागत है,",
    all_premium_features_unlocked: "सभी प्रीमियम सुविधाएं अनलॉक हो गईं!",
    quick_actions: "त्वरित कार्य",
    name_analysis: "नाम विश्लेषण",
    love_couple: "प्रेमी जोड़ा",
    dictio_name: "नाम शब्दकोश",
    generator_name_optimizer: "नाम जेनरेटर ऑप्टिमाइज़र",
    lifeplan_report: "जीवन योजना रिपोर्ट",
    successful_people: "सफल लोग",
    synchronize: "सिंक्रोनाइज़",
    coherence: "सुसंगति",
    momentum: "गति",
    discover_power_names:
      "हमारे व्यापक विश्लेषण उपकरणों के माध्यम से नामों की शक्ति की खोज करें। उनके जैसे मूल्य रखना चाहते हैं? >> और जानें",
    earn_free_credits: "मुफ्त क्रेडिट कमाएं",
    share_with_friends:
      "प्रीमियम सुविधाओं को अनलॉक करने के लिए दोस्तों के साथ साझा करें",
    share_now: "अभी साझा करें",
    // Tab Bar
    home: "होम",
    analyze: "विश्लेषण",
    names: "नाम",
    match: "मैच",
    account: "खाता",
    // Common
    language: "भाषा",
    // Numerology Results
    hara: "हारा",
    expression: "अभिव्यक्ति",
    time: "समय",
    dimensional_analysis: "आयामी विश्लेषण",
    synchronize_score: "सिंक्रोनाइज़ स्कोर",
    coherence_value: "सुसंगति मूल्य",
    synergize_value: "तालमेल मूल्य",
    productive_value: "उत्पादक मूल्य",
    momen_sukses_value: "सफलता क्षण मूल्य",
    grafologi_index: "लेखन विज्ञान सूचकांक",
    potential_suggestions: "संभावित सुझाव",
    advanced_analysis: "उन्नत विश्लेषण",
    core_numbers: "मुख्य संख्याएं",
    character_number: "चरित्र संख्या",
    expression_number: "अभिव्यक्ति संख्या",
    soul_number: "आत्मा संख्या",
    personality_number: "व्यक्तित्व संख्या",
    number_intensity: "संख्या तीव्रता",
    personal_development: "व्यक्तिगत विकास",
    self_potential: "स्व क्षमता",
    attitude_number: "दृष्टिकोण संख्या",
    growth_number: "विकास संख्या",
    birth_date_analysis: "जन्म तिथि विश्लेषण",
    day: "दिन",
    month: "महीना",
    year: "वर्ष",
    pythagorean_analysis: "पाइथागोरियन विश्लेषण",
    soul_urge: "आत्मा की इच्छा",
    personality: "व्यक्तित्व",
    challenge_numbers: "चुनौती संख्याएं",
    challenge: "चुनौती",
    current_year_analysis: "वर्तमान वर्ष विश्लेषण",
    personal_year_number: "व्यक्तिगत वर्ष संख्या",
    premium_analysis: "प्रीमियम विश्लेषण",
    upgrade_to_premium: "प्रीमियम में अपग्रेड करें",
    parameter_detail: "पैरामीटर विवरण",
    close: "बंद करें",
    // Numerology Form
    numerology_analysis: "अंकज्योतिष विश्लेषण",
    basic_analysis: "बुनियादी विश्लेषण",
    advanced_analysis: "उन्नत विश्लेषण",
    full_name: "पूरा नाम",
    enter_full_name: "अपना पूरा नाम दर्ज करें",
    normalized: "सामान्यीकृत",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    birth_date: "जन्म तिथि",
    select_birth_date: "जन्म तिथि चुनें",
    cancel: "रद्द करें",
    done: "हो गया",
    advanced_analysis_features: "उन्नत विश्लेषण सुविधाएं:",
    life_path_number: "• जीवन पथ संख्या (हारा)",
    expression_number_feature: "• अभिव्यक्ति संख्या",
    soul_urge_number: "• आत्मा इच्छा संख्या",
    personality_number_feature: "• व्यक्तित्व संख्या",
    maturity_number: "• परिपक्वता संख्या",
    personal_year_number_feature: "• व्यक्तिगत वर्ष संख्या",
    analyze: "विश्लेषण करें",
    // Name Generator
    personal_name_optimizer: "व्यक्तिगत नाम अनुकूलक",
    baby_name_generator: "बच्चे का नाम जेनरेटर",
    personal_name: "व्यक्तिगत नाम",
    baby_name: "बच्चे का नाम",
    generation_mode: "जेनरेशन मोड",
    add_one_word: "एक शब्द जोड़ें",
    add_some_word: "कुछ शब्द जोड़ें",
    your_first_name: "आपका पहला नाम",
    family_name_optional: "पारिवारिक नाम (वैकल्पिक)",
    enter_first_name: "अपना पहला नाम दर्ज करें",
    enter_family_name: "पारिवारिक नाम दर्ज करें (वैकल्पिक)",
    name_origin: "नाम की उत्पत्ति",
    generate_names: "नाम जेनरेट करें",
    advanced_search: "उन्नत खोज",
    jalankan_lanjut_combi: "चलाएं/जारी रखें कॉम्बी",
    suggested_names: "सुझाए गए नाम",
    generated_from: "से जेनरेट किया गया:",
    no_matching_names: "कोई मेल खाने वाले नाम नहीं मिले। अलग पैरामीटर आज़माएं।",
    // Compatibility Checker
    compatibility_checker: "संगतता जांचकर्ता",
    person_1: "व्यक्ति 1",
    person_2: "व्यक्ति 2",
    check_compatibility: "संगतता जांचें",
    compatibility_results: "संगतता परिणाम",
    compatibility_areas: "संगतता क्षेत्र",
    detailed_analysis_unlocked: "विस्तृत विश्लेषण - अनलॉक!",
    all_premium_features_available:
      "आपके संगतता विश्लेषण के लिए सभी प्रीमियम सुविधाएं अब उपलब्ध हैं।",
    // Life Report
    life_report: "जीवन रिपोर्ट",
    life_path: "जीवन पथ",
    year_life_report: "100 वर्ष जीवन रिपोर्ट",
    daily_advice: "दैनिक सलाह",
    daily_advice_calendar: "दैनिक सलाह कैलेंडर",
    select_date: "तारीख चुनें",
    monthly_advice_calendar: "मासिक सलाह कैलेंडर",
    legend: "किंवदंती:",
    // G1-G9 Descriptions
    g1_desc:
      "स्वतंत्र और नेतृत्व-उन्मुख, मजबूत पहल और अग्रणी भावना के साथ। रचनात्मक क्षमताओं के साथ प्राकृतिक जन्मे नेता।",
    g2_desc:
      "सहयोगी और कूटनीतिक, साझेदारी और टीम वर्क में उत्कृष्ट। धैर्यवान और विस्तार-उन्मुख मजबूत सहज क्षमताओं के साथ।",
    g3_desc:
      "रचनात्मक और अभिव्यंजक, मजबूत संचार कौशल के साथ। कलात्मक प्रतिभाएं और जीवन पर आशावादी दृष्टिकोण।",
    g4_desc:
      "व्यावहारिक और संगठित, मजबूत कार्य नैतिकता और विवरण पर ध्यान के साथ। दृष्टिकोण में विश्वसनीय और व्यवस्थित।",
    g5_desc:
      "स्वतंत्रता-प्रेमी और साहसी, विविधता और परिवर्तन की मजबूत इच्छा के साथ। गतिशील और बहुमुखी व्यक्तित्व।",
    g6_desc:
      "पोषण और जिम्मेदार, मजबूत पारिवारिक अभिविन्यास के साथ। देखभाल और सहायक चिकित्सा क्षमताओं के साथ।",
    g7_desc:
      "विश्लेषणात्मक और आत्मनिरीक्षण, मजबूत आध्यात्मिक झुकाव के साथ। शोधकर्ता और सत्य और ज्ञान के साधक।",
    g8_desc:
      "महत्वाकांक्षी और व्यापार-उन्मुख, मजबूत भौतिक फोकस के साथ। कार्यकारी क्षमताओं के साथ प्राकृतिक आयोजक।",
    g9_desc:
      "मानवतावादी और उदार, दूसरों की सेवा करने की मजबूत इच्छा के साथ। सार्वभौमिक दृष्टिकोण के साथ दयालु और समझदार।",
  },
  id: {
    // Home Screen
    welcome_back: "Selamat datang kembali,",
    all_premium_features_unlocked: "Semua Fitur Premium Terbuka!",
    quick_actions: "Aksi Cepat",
    name_analysis: "Analisis Nama",
    love_couple: "Pasangan Cinta",
    dictio_name: "KamusNama",
    generator_name_optimizer: "Pengoptimal Generator Nama",
    lifeplan_report: "Laporan Rencana Hidup",
    successful_people: "Orang-orang sukses",
    synchronize: "Sinkronisasi",
    coherence: "Koherensi",
    momentum: "Momentum",
    discover_power_names:
      "Temukan kekuatan nama melalui alat analisis komprehensif kami. Ingin memiliki nilai seperti mereka? >> Pelajari Lebih Lanjut",
    earn_free_credits: "Dapatkan Kredit Gratis",
    share_with_friends: "Bagikan dengan teman untuk membuka fitur premium",
    share_now: "Bagikan Sekarang",
    // Tab Bar
    home: "Beranda",
    analyze: "Analisis",
    names: "Nama",
    match: "Kecocokan",
    account: "Akun",
    // Common
    language: "Bahasa",
    // Parameter Details
    hara_1_desc:
      "🤠Positif dalam kemandirian dan independensi, perkembangan (awal) yang baru",
    hara_2_desc:
      "🤝Peningkatan koneksi dan kerjasama, dibantu oleh suatu hubungan yang berjalan baik dan lama",
    hara_3_desc:
      "💡Potensi ide dan kreativitas, pembawaan santai dan kenikmatan atas segala hal yang perlu dikendalikan",
    hara_4_desc:
      "✔️Potensi karir dan hubungan yang menguat, berpindah untuk bergerak maju, tanggung jawab terselesaikan dengan praktis",
    hara_5_desc:
      "❌Segala potensi buruk ; apes, mudah dikelabui, pengkhianatan, celaka, sakit, berakhir buruk",
    hara_6_desc:
      "🏡Potensi berkembang dalam hal kekeluargaan, sosial, membantu tua muda, perbaikan, kesembuhan, kemajuan",
    hara_7_desc:
      "😠Potensi masalah finansial, konflik emosional (timbul celaka), plin-plan, gangguan syaraf, sel abnormal",
    hara_8_desc:
      "🤕Potensi celaka, sakit (pemulihan lama), salah diagnosis, mengakhiri sesuatu secara buruk (berdampak serius)",
    hara_9_desc:
      "🤧Potensi gangguan finansial, gangguan obat, kurang sehat, berakhir (apa saja) karena dilakukan pihak lain",
    hara_11_desc:
      "🤢Potensi gagal usaha, jadi kambing hitam, tekanan psikologi, komplikasi, pisah karena beda prinsip, gangguan kesehatan",
    hara_13_desc:
      "😳Potensi kecewa atas hasil (bangkrut,rugi) rumah tangga maupun bisnis, dikhianati oleh orang dekat",
    // Numerology Results
    hara: "Hara",
    expression: "Ekspresi",
    time: "Waktu",
    dimensional_analysis: "Analisis Dimensional",
    synchronize_score: "Skor Sinkronisasi",
    coherence_value: "Nilai Koherensi",
    synergize_value: "Nilai Sinergi",
    productive_value: "Nilai Produktif",
    momen_sukses_value: "Nilai Momen Sukses",
    grafologi_index: "Indeks Grafologi",
    potential_suggestions: "Saran Potensial",
    advanced_analysis: "Analisis Lanjutan",
    core_numbers: "Angka Inti",
    character_number: "Angka Karakter",
    expression_number: "Angka Ekspresi",
    soul_number: "Angka Jiwa",
    personality_number: "Angka Kepribadian",
    number_intensity: "Intensitas Angka",
    personal_development: "Pengembangan Pribadi",
    self_potential: "Potensi Diri",
    attitude_number: "Angka Sikap",
    growth_number: "Angka Pertumbuhan",
    birth_date_analysis: "Analisis Tanggal Lahir",
    day: "Hari",
    month: "Bulan",
    year: "Tahun",
    pythagorean_analysis: "Analisis Pythagoras",
    soul_urge: "Dorongan Jiwa",
    personality: "Kepribadian",
    challenge_numbers: "Angka Tantangan",
    challenge: "Tantangan",
    current_year_analysis: "Analisis Tahun Saat Ini",
    personal_year_number: "Angka Tahun Pribadi",
    premium_analysis: "Analisis Premium",
    upgrade_to_premium: "Upgrade ke Premium",
    parameter_detail: "Detail Parameter",
    close: "Tutup",
    // Numerology Form
    numerology_analysis: "Analisis Numerologi",
    basic_analysis: "Analisis Dasar",
    advanced_analysis: "Analisis Lanjutan",
    full_name: "Nama Lengkap",
    enter_full_name: "Masukkan nama lengkap Anda",
    normalized: "Dinormalisasi",
    gender: "Jenis Kelamin",
    male: "Laki-laki",
    female: "Perempuan",
    birth_date: "Tanggal Lahir",
    select_birth_date: "Pilih Tanggal Lahir",
    cancel: "Batal",
    done: "Selesai",
    advanced_analysis_features: "Fitur Analisis Lanjutan:",
    life_path_number: "• Angka Jalur Hidup (Hara)",
    expression_number_feature: "• Angka Ekspresi",
    soul_urge_number: "• Angka Dorongan Jiwa",
    personality_number_feature: "• Angka Kepribadian",
    maturity_number: "• Angka Kedewasaan",
    personal_year_number_feature: "• Angka Tahun Pribadi",
    analyze: "Analisis",
    // Name Generator
    personal_name_optimizer: "Pengoptimal Nama Pribadi",
    baby_name_generator: "Generator Nama Bayi",
    personal_name: "Nama Pribadi",
    baby_name: "Nama Bayi",
    generation_mode: "Mode Generasi",
    add_one_word: "Tambah Satu Kata",
    add_some_word: "Tambah Beberapa Kata",
    your_first_name: "Nama Depan Anda",
    family_name_optional: "Nama Keluarga (Opsional)",
    enter_first_name: "Masukkan nama depan Anda",
    enter_family_name: "Masukkan nama keluarga (opsional)",
    name_origin: "Asal Nama",
    generate_names: "Generate Nama",
    advanced_search: "Pencarian Lanjutan",
    jalankan_lanjut_combi: "Jalankan/Lanjut Combi",
    suggested_names: "Nama yang Disarankan",
    generated_from: "Dihasilkan dari:",
    no_matching_names:
      "Tidak ada nama yang cocok ditemukan. Coba parameter yang berbeda.",
    // Compatibility Checker
    compatibility_checker: "Pemeriksa Kompatibilitas",
    person_1: "Orang 1",
    person_2: "Orang 2",
    check_compatibility: "Periksa Kompatibilitas",
    compatibility_results: "Hasil Kompatibilitas",
    compatibility_areas: "Area Kompatibilitas",
    detailed_analysis_unlocked: "Analisis Terperinci - Terbuka!",
    all_premium_features_available:
      "Semua fitur premium sekarang tersedia untuk analisis kompatibilitas Anda.",
    // Life Report
    life_report: "Laporan Hidup",
    life_path: "Jalur Hidup",
    year_life_report: "Laporan Hidup 100 Tahun",
    daily_advice: "Saran Harian",
    daily_advice_calendar: "Kalender Saran Harian",
    select_date: "Pilih Tanggal",
    monthly_advice_calendar: "Kalender Saran Bulanan",
    legend: "Legenda:",
    // G1-G9 Descriptions
    g1_desc:
      "Mandiri dan berorientasi kepemimpinan, dengan inisiatif kuat dan jiwa pelopor. Pemimpin alami dengan kemampuan kreatif.",
    g2_desc:
      "Kooperatif dan diplomatik, unggul dalam kemitraan dan kerja tim. Sabar dan berorientasi detail dengan kemampuan intuitif yang kuat.",
    g3_desc:
      "Kreatif dan ekspresif, dengan keterampilan komunikasi yang kuat. Bakat artistik dan pandangan hidup yang optimis.",
    g4_desc:
      "Praktis dan terorganisir, dengan etos kerja yang kuat dan perhatian pada detail. Dapat diandalkan dan sistematis dalam pendekatan.",
    g5_desc:
      "Pencinta kebebasan dan petualang, dengan keinginan kuat akan variasi dan perubahan. Kepribadian yang dinamis dan serbaguna.",
    g6_desc:
      "Memelihara dan bertanggung jawab, dengan orientasi keluarga yang kuat. Peduli dan mendukung dengan kemampuan penyembuhan.",
    g7_desc:
      "Analitis dan introspektif, dengan kecenderungan spiritual yang kuat. Peneliti dan pencari kebenaran dan kebijaksanaan.",
    g8_desc:
      "Ambisius dan berorientasi bisnis, dengan fokus material yang kuat. Organisator alami dengan kemampuan eksekutif.",
    g9_desc:
      "Humanis dan murah hati, dengan keinginan kuat untuk melayani orang lain. Penuh kasih dan pengertian dengan pandangan universal.",
  },
};

export default function MainApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [userName, setUserName] = useState("Guest");
  const [isPremium, setIsPremium] = useState(true);
  const [language, setLanguage] = useState("en");

  // Analysis state
  const [analysisName, setAnalysisName] = useState("");
  const [analysisBirthdate, setAnalysisBirthdate] = useState<Date | null>(null);
  const [analysisGender, setAnalysisGender] = useState<"Male" | "Female">(
    "Male",
  );
  const [showResults, setShowResults] = useState(false);
  const [showLifeReport, setShowLifeReport] = useState(false);

  // Translation function
  const t = (key: string) => {
    return (
      translations[language as keyof typeof translations]?.[key] ||
      translations.en[key] ||
      key
    );
  };

  const handleAnalysisSubmit = (
    name: string,
    birthdate: Date,
    gender: "Male" | "Female",
  ) => {
    setAnalysisName(name);
    setAnalysisBirthdate(birthdate);
    setAnalysisGender(gender);
    setShowResults(true);
  };

  const handleNavigate = (screen: string) => {
    switch (screen) {
      case "analyze":
        setActiveTab("analyze");
        setShowResults(false);
        setShowLifeReport(false);
        break;
      case "report":
        setActiveTab("analyze");
        setShowLifeReport(true);
        setShowResults(false);
        break;
      case "names":
        setActiveTab("names");
        break;
      case "compatibility":
        setActiveTab("compatibility");
        break;
      case "membership":
        setActiveTab("account");
        // Additional logic to show membership plans
        break;
      case "account":
        setActiveTab("account");
        break;
      default:
        setActiveTab(screen);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            userName={userName}
            isPremium={isPremium}
            onNavigate={handleNavigate}
          />
        );
      case "analyze":
        if (showLifeReport && analysisName && analysisBirthdate) {
          return (
            <LifeReport
              name={analysisName}
              birthdate={analysisBirthdate}
              gender={analysisGender}
              isPremium={isPremium}
            />
          );
        }
        return showResults && analysisName && analysisBirthdate ? (
          <NumerologyResults
            name={analysisName}
            birthdate={analysisBirthdate}
            gender={analysisGender}
            isPremium={isPremium}
          />
        ) : (
          <NumerologyForm onSubmit={handleAnalysisSubmit} />
        );
      case "names":
        return (
          <NameGenerator
            isPremium={isPremium}
            analysisName={analysisName}
            analysisBirthdate={analysisBirthdate}
            analysisGender={analysisGender}
          />
        );
      case "compatibility":
        return <CompatibilityChecker isPremium={isPremium} />;
      case "account":
        return (
          <AccountScreen
            userName={userName}
            isPremium={isPremium}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <HomeScreen
            userName={userName}
            isPremium={isPremium}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      <SafeAreaView className="flex-1 bg-white">
        <View
          className="flex-1"
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          {renderContent()}
        </View>
        <TabBar activeTab={activeTab} onChangeTab={setActiveTab} />
      </SafeAreaView>
    </TranslationContext.Provider>
  );
}
