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
    hara_1_desc:
      "🤠Positive in independence and self-reliance, new (beginning) developments, usually initiated by a new thing/job/project, a relocation, career change, or similar major step. Independence and strength, likely to be an individualist. Potential to have authority/resistance to dominant figures. More profitable business opportunities for personal but less suitable/profitable if done in a cooperative manner. There will be a lot of potential for good fortune in finances and adventures. Tend to get support from several sources. In the long phase you will be financially stable, strong, and successful in business",
    hara_2_desc:
      "🤠Positive in independence and self-reliance, new (beginning) developments, usually initiated by a new thing/job/project, a relocation, career change, or similar major step. Independence and strength, likely to be an individualist. Potential to have authority/resistance to dominant figures. More profitable business opportunities for personal but less suitable/profitable if done in a cooperative manner. There will be a lot of potential for good fortune in finances and adventures. Tend to get support from several sources. In the long phase you will be financially stable, strong, and successful in business",
    hara_3_desc:
      "💡Potential for ideas and creativity, easygoing and enjoyment of all things that need to be controlled. In the short phase potential for ACTION of creativity and originality, increased self-expression. This is Capital. Full of inspiration and motivation and ideas of life. When socializing, you will bring comfort, Potential to experience a life full of travel and inspire others. Will increase other pleasures of the material world / Money",
    hara_4_desc:
      "✔️Potential for career and relationships to strengthen, moving forward, responsibilities completed practically. In the short phase, there is the potential for promising business opportunities, the disappearance of difficulties with authorities, especially institutions and their regulations. Finances that are on the rise. Strength and determination can help you realize your plans. In the long phase, you have the potential to experience improvements in career and finances. You can also expect a strengthening relationship, especially with someone close to you",
    hara_5_desc:
      "❌Potential bad tendencies, unlucky, tend to be easily fooled, betrayal, misfortune, illness, end badly. The name must be changed or added. Easily fooled by people, potentially often experiencing bad luck and bad things, on average negative things that happen in other ending code parameters also occur in this number. So you should be careful if your name contains Ending Code. In addition, it has the potential to be easily fooled by people, betrayed by friends, and others",
    hara_6_desc:
      "🏡Potential to develop in terms of family, social, helping young and old, improvement, healing, progress. In the short phase there is an opportunity to involve yourself in the family, please and help various generations. Potential to experience interest in environmental and political issues and also has the potential to make you a more responsible person. In the long phase has the potential to get prospects that seem very good. In all areas of your life there is the potential to experience improvement, healing and progress",
    hara_7_desc:
      "😠Potential financial problems, emotional conflicts (causing misfortune), fickleness, nervous disorders, abnormal cells. Short phase: in life will experience difficulties in allocating and, experiencing financial problems. Long phase: High potential for cancer and tumors and emotional conflicts (example love triangle)",
    hara_8_desc:
      "🤕Potential for unpleasant travel, must be careful not to get hurt, get sick (long recovery), misdiagnosis, end something badly (serious impact)",
    hara_9_desc:
      "🤧Potential financial disruption, drug disruption or drug insertion, unhealthy/experiencing illnesses such as viral outbreaks and ending badly (anything) because of what other parties do",
    hara_11_desc:
      "🤢Potential for business failure, being a scapegoat, psychological pressure or betrayal, complications, separation due to different principles, health problems",
    hara_13_desc:
      "😳Potential disappointment with household or business results (bankruptcy, loss), betrayal by close people, and the inability to get maximum and optimal results from all efforts undertaken",
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
    hara_1_desc:
      "🤝Des liens et une coopération renforcés, favorisés par une relation solide et durable. À court terme, on observe un potentiel de nouvelles relations professionnelles ou relationnelles, une plus grande reconnaissance pour la vie, une sensibilité accrue aux instincts de la vie et des affaires, une volonté de partenariat, une facilité de négociation et une sagesse accrues. À long terme, des relations harmonieuses sont également porteuses de succès, de finances et d'économies saines",
    hara_2_desc:
      "🤝Des liens et une coopération renforcés, favorisés par une relation solide et durable. À court terme, on observe un potentiel de nouvelles relations professionnelles ou relationnelles, une plus grande reconnaissance pour la vie, une sensibilité accrue aux instincts de la vie et des affaires, une volonté de partenariat, une facilité de négociation et une sagesse accrues. À long terme, des relations harmonieuses sont également porteuses de succès, de finances et d'économies saines",
    hara_3_desc:
      "💡Potentiel d'idées et de créativité, facilité et plaisir à maîtriser tout ce qui nécessite d'être maîtrisé. À court terme, potentiel d'ACTION, de créativité et d'originalité, expression personnelle accrue. C'est le Capital. Plein d'inspiration, de motivation et d'idées de vie. En socialisant, vous apporterez du réconfort, vous aurez le potentiel de vivre une vie riche en voyages et d'inspirer les autres. Vous augmenterez les autres plaisirs du monde matériel / Argent",
    hara_4_desc:
      "✔️Potentiel de renforcement professionnel et relationnel, d'avancement et de responsabilités pratiquement accomplies. À court terme, opportunités commerciales prometteuses, résolution des difficultés avec les autorités, notamment les institutions et leurs réglementations, et perspectives financières en hausse. Force et détermination peuvent vous aider à concrétiser vos projets. À long terme, vous avez le potentiel d'améliorer votre carrière et vos finances. Vous pouvez également vous attendre à un renforcement relationnel, notamment avec un proche",
    hara_5_desc:
      "❌ Tous les mauvais potentiels : malchance, facile à tromper, trahison, désastre, maladie, fin malheureuse. Toute la malchance et les mauvaises choses du harani précédent se retrouvent dans celui-ci. Soyez donc prudent si vous avez un harani 5, que cela vous plaise ou non. Les problèmes de confiance sont dangereux. On a tendance à envisager de tromper son amant par tentation. Tomber dans un piège peut entraîner la perte de tout ce qui compte vraiment pour nous. Le nom doit être modifié ou ajouté. Facilement dupé, mourir d'une maladie chronique, mourir d'un empoisonnement sans que l'empoisonneur ne soit jamais découvert, mourir d'un accident, être trahi par son propre ami, et le summum est le risque d'être tué par un ami et non par un adversaire (son propre petit ami, son propre frère ou sa propre sœur). Ce harani est le pire de tous les nombres de codes de fin. Il peut souvent être associé à la malchance et aux mauvaises choses. En moyenne, les effets négatifs des autres paramètres de codes de fin se produisent également dans ce nombre. Soyez donc prudent si votre nom contient un code de fin. De plus, vous risquez d'être facilement trompé, trahi par vos amis et d'autres personnes",
    hara_6_desc:
      "🏡Potentiel de développement familial et social, d'entraide entre jeunes et moins jeunes, d'amélioration, de guérison et de progrès. À court terme, possibilité de s'impliquer dans la famille, faire plaisir et aider les différentes générations. Intérêt pour les questions environnementales et politiques, et potentiel de devenir une personne plus responsable. À long terme, potentiel d'avenir prometteur. Amélioration, guérison et progrès dans tous les domaines de la vie",
    hara_7_desc:
      "😠Problèmes financiers potentiels, conflits émotionnels (causant des malheurs), inconstance, troubles nerveux, cellules anormales. Phase courte : difficultés à gérer ses dépenses et problèmes financiers. Phase longue : fort risque de cancer, de tumeurs et de conflits émotionnels (exemple : triangle amoureux)",
    hara_8_desc:
      "🤕Possibilité de voyage désagréable, il faut faire attention à ne pas se blesser, tomber malade (longue convalescence), mauvais diagnostic, mauvaise fin de quelque chose (impact grave)",
    hara_9_desc:
      "🤧Perturbation financière potentielle, ou perturbation de la consommation de médicaments ou insertion de médicaments, ou maladies malsaines/vivantes telles que des épidémies virales et fin mal (n'importe quoi) à cause de ce que font les autres parties",
    hara_11_desc:
      "🤢Potentiel d'échec commercial, ou bouc émissaire, ou pression psychologique ou trahison, ou complications, ou séparation due à des principes différents, ou problèmes de santé",
    hara_13_desc:
      "😳Potentiel de déception avec les résultats du ménage ou de l'entreprise (faillite, perte), trahison de la part de proches et incapacité à obtenir des résultats maximaux et optimaux de tous les efforts entrepris",
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
      "Nourricier et responsable, avec une forte orientation familiale. Cariñoso et solidaire avec des capacités de guérison.",
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
    hara_1_desc:
      "🤠Positivo en independencia y autosuficiencia, nuevos desarrollos (inicios), generalmente iniciados por una nueva cosa/trabajo/proyecto, una reubicación, un cambio de carrera o un paso importante similar. Independencia y fortaleza, con probabilidad de individualismo. Potencial para tener autoridad/resistencia a figuras dominantes. Oportunidades de negocio más rentables para el ámbito personal, pero menos adecuadas/rentables si se desarrollan de forma cooperativa. Habrá un gran potencial de buena fortuna en las finanzas y aventuras. Tendrá la posibilidad de recibir apoyo de diversas fuentes. En la fase larga, será financieramente estable, fuerte y exitoso en los negocios",
    hara_2_desc:
      "🤝Mayores conexiones y cooperación, gracias a una buena relación a largo plazo. En la fase corta, existe el potencial de nuevas conexiones en negocios o relaciones, mayor gratitud por la vida, mayor sensibilidad hacia la vida y los instintos empresariales, disposición para colaborar con otros, facilidad para negociar y sabiduría. En la fase larga, las relaciones fluidas también tienen el potencial de éxito, finanzas y economía estables",
    hara_3_desc:
      "💡Potencial para las ideas y la creatividad, tranquilidad y disfrute de todo aquello que requiere control. En la fase corta, potencial para la ACCIÓN, creatividad y originalidad, mayor autoexpresión. Esto es Capital. Lleno de inspiración, motivación e ideas para la vida. Al socializar, aportarás comodidad. Potencial para experimentar una vida llena de viajes e inspirarás a otros. Aumentarás otros placeres del mundo material/dinero",
    hara_4_desc:
      "✔️Potencial para fortalecer tu carrera y tus relaciones, avanzar y cumplir con tus responsabilidades de forma práctica. En la fase corta, existe la posibilidad de oportunidades de negocio prometedoras y la desaparición de dificultades con las autoridades, especialmente con las instituciones y sus regulaciones. Tus finanzas están en alza. La fuerza y la determinación pueden ayudarte a hacer realidad tus planes. En la fase larga, tienes el potencial de experimentar mejoras en tu carrera y tus finanzas. También puedes esperar un fortalecimiento de tus relaciones, especialmente con alguien cercano",
    hara_5_desc:
      "❌Todos los malos potenciales: mala suerte, fácil de engañar, traición, desastre, enfermedad, mal final. Toda la mala suerte y las cosas malas del harani anterior están en este harani, así que ten cuidado si hay un harani 5, te guste o no. Hay peligro en los problemas de confianza. Existe la tendencia a pensar en engañar a tu pareja por la tentación. Si caes en una trampa, tienes el potencial de perder todo lo que consideras muy importante. El nombre debe ser cambiado o añadido. Fácil de engañar, morir de una enfermedad crónica, morir por envenenamiento sin que el envenenador sea detectado, morir por un accidente, ser traicionado por tu propio amigo, y el punto culminante es el potencial de ser asesinado por un amigo, no por un oponente (tu propio novio, tu propio hermano). Este harani es un número que se puede decir que es el peor de todos los números del Código Final, tiene el potencial de experimentar a menudo mala suerte y cosas malas; en promedio, las cosas negativas que ocurren en otros parámetros del código final también ocurren en este número harani. Así que ten cuidado si tu nombre contiene el Código Final. Además, podrías ser fácilmente engañado, traicionado por tus propios amigos y otros",
    hara_6_desc:
      "🏡Potencial de desarrollo familiar y social, ayuda a jóvenes y mayores, mejora, sanación y progreso. En la fase corta, existe la oportunidad de involucrarse en la familia, complacer y ayudar a varias generaciones. Potencial de interés por temas ambientales y políticos, y también tiene el potencial de convertirse en una persona más responsable. En la fase larga, existe el potencial de obtener muy buenas perspectivas. En todas las áreas de la vida, existe el potencial de experimentar mejora, sanación y progreso",
    hara_7_desc:
      "Posibles problemas financieros, conflictos emocionales (que pueden causar desgracias), inconstancia, trastornos nerviosos, células anormales. Fase corta: En la vida, se experimentarán dificultades para distribuir recursos y problemas financieros. Fase larga: Alto potencial de cáncer, tumores y conflictos emocionales (por ejemplo, un triángulo amoroso)",
    hara_8_desc:
      "🤕Posibilidad de un viaje desagradable, hay que tener cuidado de no lastimarse, enfermarse (recuperación prolongada), diagnóstico erróneo, terminar algo mal (impacto grave)",
    hara_9_desc:
      "🤧Posible interrupción financiera, interrupción de medicamentos o inserción de medicamentos, enfermedades no saludables/experiencia de enfermedades como brotes virales y final mal (cualquier cosa) debido a lo que hacen otras partes",
    hara_11_desc:
      "🤢Potencial de fracaso empresarial, ser chivo expiatorio, presión psicológica o traición, complicaciones, separación por diferentes principios, problemas de salud",
    hara_13_desc:
      "😳Posible decepción con los resultados del hogar o del negocio (quiebra, pérdidas), traición por parte de personas cercanas e incapacidad de obtener resultados máximos y óptimos de todos los esfuerzos realizados",
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
    hara_1_desc:
      "🤠 إيجابي في الاستقلال والاعتماد على الذات، وتطورات جديدة (بداية)، عادةً ما يسبقها شيء/وظيفة/مشروع جديد، أو انتقال، أو تغيير مهني، أو خطوة رئيسية مماثلة. استقلالية وقوة، وإمكانية التفرد. إمكانية امتلاك السلطة/مقاومة الشخصيات المهيمنة. فرص عمل أكثر ربحية للأفراد، ولكنها أقل ملاءمة/ربحية إذا تم ذلك في شكل تعاون. ستكون هناك احتمالات كبيرة للتوفيق في الأمور المالية والمغامرات. تميل إلى الحصول على الدعم من مصادر متعددة. على المدى الطويل، ستكون مستقرًا ماليًا، وقويًا، وناجحًا في العمل",
    hara_2_desc:
      "🤝تعزيز الروابط والتعاون، مدعومًا بعلاقة جيدة وطويلة الأمد. في المرحلة القصيرة، هناك إمكانية لتكوين علاقات جديدة في مجال الأعمال أو العلاقات، وزيادة الوعي بالامتنان للحياة، وزيادة الحساسية لغرائز الحياة والأعمال، والاستعداد للشراكة مع الآخرين، وسهولة التفاوض والحكمة. في المرحلة الطويلة، تتمتع العلاقات الجيدة بإمكانية النجاح، وتحسن الوضع المالي والاقتصادي",
    hara_3_desc:
      "💡إمكانية الأفكار والإبداع، والهدوء والاستمتاع بكل ما يحتاج إلى ضبط. في المرحلة القصيرة، هناك إمكانية للإبداع والأصالة، وزيادة التعبير عن الذات. هذا هو رأس المال. مليء بالإلهام والتحفيز وأفكار الحياة. عند التواصل الاجتماعي، ستجلب الراحة، وإمكانية لتجربة حياة مليئة بالسفر وإلهام الآخرين. ستكون هناك ملذات متزايدة - ملذات أخرى من الجوانب المادية للعالم / المال",
    hara_4_desc:
      "✔️تتعزز فرصك المهنية والعاطفية، وتتقدم للأمام، وتُنجز مسؤولياتك عمليًا. في المرحلة القصيرة، هناك إمكانية للحصول على فرص عمل واعدة، واختفاء الصعوبات مع السلطات، وخاصة المؤسسات ولوائحها. ميزانيتك في ازدياد. القوة والعزيمة ستساعدك على تحقيق خططك. في المرحلة الطويلة، لديك القدرة على تحسين وضعك المهني والمالي. كما يمكنك توقع علاقات أقوى، خاصة مع شخص قريب منك",
    hara_5_desc:
      "❌قد يكون من السهل خداعك، أو خيانة، أو سوء حظ، أو مرض، أو نهاية سيئة. يجب تغيير الاسم أو إضافته. سهل الخداع، وقد يتعرض غالبًا لسوء الحظ وأمور سيئة، وفي المتوسط، قد تظهر أيضًا أمور سلبية تحدث في معلمات رمز النهاية الأخرى في هذا الرقم. لذا، كن حذرًا إذا كان اسمك يحتوي على رمز النهاية. بالإضافة إلى ذلك، قد يكون من السهل خداعه، أو خيانته من الأصدقاء، أو من الآخرين",
    hara_6_desc:
      "🏡 لديك القدرة على النمو في المجالات العائلية والاجتماعية، ومساعدة الصغار والكبار، والتحسن، والشفاء، والتقدم. في المرحلة القصيرة، لديك فرصة للانخراط في الأسرة، وإسعاد ومساعدة مختلف الأجيال. لديك القدرة على الاهتمام بالقضايا البيئية والسياسية، كما أن لديك القدرة على أن تصبح شخصًا أكثر مسؤولية. في المرحلة الطويلة، لديك القدرة على الحصول على آفاق تبدو واعدة جدًا. في جميع مجالات حياتك، لديك القدرة على التحسن، والشفاء، والتقدم",
    hara_7_desc:
      "😠مشاكل مالية محتملة، صراعات عاطفية (مما قد يؤدي إلى سوء الحظ)، تقلبات مزاجية، اضطرابات عصبية، خلايا غير طبيعية. مرحلة قصيرة: سيواجه في حياته صعوبات في تخصيص موارده، وسيواجه مشاكل مالية. مرحلة طويلة: احتمالية عالية للإصابة بالسرطان والأورام، وصراعات عاطفية (مثال على مثلثات الحب)",
    hara_8_desc:
      "🤕احتمالية السفر غير المريحة، يجب الحذر من التعرض للأذى، أو المرض (فترة نقاهة طويلة)، أو التشخيص الخاطئ، أو إنهاء أمر سيء (تأثير خطير)",
    hara_9_desc:
      "🤧احتمالية حدوث اضطرابات مالية، أو إدمان المخدرات، أو الإصابة بأمراض غير صحية، مثل تفشي الفيروسات، أو نهاية سيئة (أو أيًا كان) بسبب ما يفعله الآخرون",
    hara_11_desc:
      "🤢احتمالية فشل العمل، أن يصبح كبش فداء، ضغط نفسي أو خيانة، تعقيدات، انفصال بسبب اختلاف المبادئ، مشاكل صحية",
    hara_13_desc:
      "😳 خيبة أمل محتملة بسبب نتائج أعمال المنزل أو العمل (إفلاس، خسارة)، وخيانة المقربين، وعدم القدرة على تحقيق أقصى النتائج الممكنة من جميع الجهود المبذولة",
    // Numerology Results
    hara: "هارا",
    expression: "التعبير",
    time: "الوقت",
    dimensional_analysis: "التحليل الأبعاد",
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
      "مستقل وموجه نحو القيادة، مع مبادرة قوية وروح رائد. قائد بالفطرة مع قدرات إبداعية.",
    g2_desc:
      "تعاوني ودبلوماسي، ممتاز في الشراكات والعمل الجماعي. صبور ومهتم بالتفاصيل مع قدرات حدسية قوية.",
    g3_desc:
      "مبدع ومعبر، مع مهارات تواصل قوية. مواهب فنية ونظرة متفائلة للحياة.",
    g4_desc:
      "عملي ومنظم، مع أخلاقيات عمل قوية واهتمام بالتفاصيل. موثوق ومنهجي في النهج.",
    g5_desc:
      "محب للحرية ومغامر، مع رغبة قوية في التنوع والتغيير. شخصية ديناميكية ومتعددة الاستخدامات.",
    g6_desc: "مغذي ومسؤول، مع توجه عائلي قوي. مهتم وداعم مع قدرات شفاء.",
    g7_desc: "تحليلي وتأملي، مع ميول روحية قوية. باحث وساعي للحقيقة والحكمة.",
    g8_desc:
      "طموح وموجه نحو الأعمال، مع تركيز مادي قوي. منظم طبيعي مع قدرات تنفيذية.",
    g9_desc:
      "إنساني وكريم، مع رغبة قوية في خدمة الآخرين. رحيم ومتفهم مع نظرة عالمية.",
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
    // Parameter Details
    hara_1_desc:
      "🤠 积极独立和自力更生，新（开始）发展，通常由新事物/工作/项目、搬迁、职业变动或类似的重大举措引发。独立性和力量，可能成为个人主义者。可能拥有权威/抵抗支配性人物的能力。个人拥有更多盈利的商业机会，但如果以合作的方式进行则不太合适/盈利较少。财务和冒险方面有很大的幸运潜力。倾向于从多个来源获得支持。长期来看，你将财务稳定、实力雄厚，并在商业上取得成功",
    hara_2_desc:
      "🤝良好的长期关系有助于增进人脉与合作。短期内，有可能在商业或人际关系中建立新的联系，增强对生活的感恩之心，对生活和商业直觉更加敏感，愿意与他人合作，易于谈判且睿智。长期来看，顺畅的人际关系也有可能带来成功，财务和经济状况也更加顺畅",
    hara_3_desc:
      "💡创意和想法的潜力，轻松的性格和对所有需要控制的事物的享受。在短期阶段，创造力和原创性的行动潜力，自我表达的增加。这是资本。充满灵感、动力和生活理念。在社交时，你会带来舒适，有可能体验充满旅行的生活并激励他人。将增加物质世界/金钱的其他乐趣",
    hara_4_desc:
      "✔️事业和人际关系有望增强，前进，责任切实完成。短期内，可能出现前景光明的商业机会，与当局（尤其是机构及其监管）的矛盾消失。财务状况正在好转。力量和决心可以帮助您实现计划。长期来看，您的事业和财务状况有望改善。您还可能期待人际关系的加强，尤其是与亲近之人",
    hara_5_desc:
      "❌潜在的不良倾向，不幸，容易被欺骗，背叛，不幸，疾病，结局不好。必须更改或添加姓名。容易被人欺骗，可能经常遭遇厄运和坏事，平均而言，其他结尾代码参数中发生的负面事情也会出现在这个数字中。因此，如果您的姓名包含结尾代码，则应谨慎处理。此外，它还可能容易被人欺骗，被朋友和其他人背叛",
    hara_6_desc:
      "🏡在家庭、社交、帮助老少、改善、疗愈和进步方面有发展潜力。短期内，您有机会融入家庭，取悦并帮助不同世代的人。您有可能对环境和政治议题产生兴趣，也有可能成为更有责任感的人。长期来看，您有可能获得看似美好的前景。在生活的各个方面，您都有可能获得改善、疗愈和进步",
    hara_7_desc:
      "😠潜在的财务问题、情感冲突（导致不幸）、反复无常、神经紊乱、细胞异常。短期：生活中会经历分配困难和财务问题。长期：患癌症、肿瘤和情感冲突（例如三角恋）的可能性较高",
    hara_8_desc:
      "🤕 旅途可能不愉快，必须小心，以免受伤、生病（恢复期较长）、误诊、结局不好（严重影响)",
    hara_9_desc:
      "🤧潜在的财务混乱、毒品混乱或毒品插入、不健康/经历疾病（如病毒爆发）以及由于其他方的行为而导致的悲惨结局（任何事情)",
    hara_11_desc:
      "🤢生意失败、成为替罪羊、心理压力或背叛、复杂情况、因原则不同而分离、健康问题",
    hara_13_desc:
      "😳对家庭或生意结果可能感到失望（破产、亏损）、被亲近的人背叛，以及无法从所做的所有努力中获得最大和最佳的结果",
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
    // Parameter Details
    hara_1_desc:
      "🤠स्वतंत्रता और आत्मनिर्भरता में सकारात्मक, नए (शुरुआती) विकास, आमतौर पर एक नई चीज़/नौकरी/प्रोजेक्ट, स्थानांतरण, करियर में बदलाव या इसी तरह के बड़े कदम से शुरू होते हैं। स्वतंत्रता और ताकत, एक व्यक्तिवादी होने की संभावना। प्रमुख व्यक्तियों के लिए अधिकार/प्रतिरोध की संभावना। व्यक्तियों के लिए अधिक लाभदायक व्यवसाय के अवसर लेकिन सहकारी तरीके से किए जाने पर कम उपयुक्त/लाभदायक। वित्त और रोमांच में अच्छे भाग्य की बहुत संभावना होगी। कई स्रोतों से समर्थन मिलने की संभावना है। लंबे चरण में आप आर्थिक रूप से स्थिर, मजबूत और व्यवसाय में सफल रहेंगे।",
    hara_2_desc:
      "🤝बढ़े हुए संपर्क और सहयोग, अच्छे और दीर्घकालिक संबंधों से सहायता प्राप्त होती है। लघु चरण में, व्यापार या रिश्तों में नए कनेक्शन की संभावना होती है, जीवन के प्रति कृतज्ञता की जागरूकता बढ़ती है, जीवन और व्यावसायिक प्रवृत्तियों के प्रति संवेदनशीलता बढ़ती है, दूसरों के साथ साझेदारी करने की इच्छा होती है, बातचीत करने में आसानी होती है और समझदारी होती है। दीर्घ चरण में, सहज संबंध, सफलता, सुचारू वित्त और अर्थव्यवस्था की भी संभावना होती है",
    hara_3_desc:
      "💡रचनात्मकता और विचारों की क्षमता, सहज व्यक्तित्व, हर उस चीज़ का आनंद लें जिसे नियंत्रित करने की आवश्यकता है। अल्पावधि में, रचनात्मक और मूल कार्यों की क्षमता, आत्म-अभिव्यक्ति में वृद्धि। यह पूंजी है। प्रेरणा, प्रेरणा और जीवन दर्शन से भरपूर। सामाजिकता के दौरान, आप दूसरों को आराम पहुँचाएँगे, यात्रा से भरपूर जीवन का अनुभव करेंगे और दूसरों को प्रेरित करेंगे। यह भौतिक दुनिया/धन के अन्य सुखों को भी बढ़ाएगा",
    hara_4_desc:
      "✔️करियर और रिश्तों में मजबूती, आगे बढ़ने, व्यावहारिक रूप से जिम्मेदारियां पूरी होने की संभावना है। छोटे चरण में, आशाजनक व्यावसायिक अवसरों की संभावना है, अधिकारियों, विशेष रूप से संस्थानों और उनके नियमों के साथ कठिनाइयों का गायब होना। वित्तीय स्थिति में वृद्धि हो रही है। ताकत और दृढ़ संकल्प आपको अपनी योजनाओं को साकार करने में मदद कर सकते हैं। लंबे चरण में, आपके पास करियर और वित्त में सुधार का अनुभव करने की क्षमता है। आप एक मजबूत रिश्ते की भी उम्मीद कर सकते हैं, खासकर अपने किसी करीबी के साथ।",
    hara_5_desc:
      "❌संभावित बुरी प्रवृत्तियाँ, बदकिस्मत, आसानी से मूर्ख बनने की प्रवृत्ति, विश्वासघात, दुर्भाग्य, बीमारी, बुरी तरह से समाप्त होना। नाम को बदलना या जोड़ना होगा। लोगों द्वारा आसानी से मूर्ख बनाया जाना, संभावित रूप से अक्सर बुरी किस्मत और बुरी चीजों का अनुभव करना, औसतन नकारात्मक चीजें जो अन्य अंत कोड मापदंडों में होती हैं, वे भी इस संख्या में होती हैं। इसलिए यदि आपके नाम में एंडिंग कोड है तो आपको सावधान रहना चाहिए। इसके अलावा, इसमें लोगों द्वारा आसानी से मूर्ख बनाए जाने, दोस्तों द्वारा धोखा दिए जाने और अन्य लोगों द्वारा धोखा दिए जाने की संभावना है।",
    hara_6_desc:
      "🏡 पारिवारिक, सामाजिक, युवा और वृद्धों की मदद, सुधार, उपचार, प्रगति के मामले में विकास की संभावना। छोटे चरण में खुद को परिवार में शामिल करने, विभिन्न पीढ़ियों को खुश करने और उनकी मदद करने का अवसर है। पर्यावरण और राजनीतिक मुद्दों में रुचि का अनुभव करने की क्षमता और आपको अधिक जिम्मेदार व्यक्ति बनाने की क्षमता भी है। लंबे चरण में ऐसी संभावनाएँ मिलने की संभावना है जो बहुत अच्छी लगती हैं। आपके जीवन के सभी क्षेत्रों में सुधार, उपचार और प्रगति का अनुभव करने की क्षमता है।",
    hara_7_desc:
      "😠संभावित वित्तीय समस्याएँ, भावनात्मक संघर्ष (दुर्भाग्य का कारण), चंचलता, तंत्रिका विकार, असामान्य कोशिकाएँ। लघु चरण: जीवन में आवंटन में कठिनाइयों का अनुभव होगा और वित्तीय समस्याओं का अनुभव होगा। दीर्घ चरण: कैंसर और ट्यूमर और भावनात्मक संघर्षों की उच्च संभावना (उदाहरण प्रेम त्रिकोण)",
    hara_8_desc:
      "🤕 अप्रिय यात्रा की संभावना, चोट न लगने, बीमार न पड़ने (लंबी रिकवरी), गलत निदान, कुछ बुरी तरह से समाप्त होने (गंभीर प्रभाव) के प्रति सावधान रहना चाहिए",
    hara_9_desc:
      "🤧संभावित वित्तीय व्यवधान, दवा व्यवधान या दवा सम्मिलन, अस्वस्थ/वायरल प्रकोप जैसी बीमारियों का अनुभव करना और अन्य पक्षों द्वारा किए गए कार्यों के कारण बुरी तरह समाप्त होना (कुछ भी)",
    hara_11_desc:
      "🤢व्यापार में असफलता, बलि का बकरा बनने, मनोवैज्ञानिक दबाव या विश्वासघात, जटिलताएं, पिसाह बदा प्रिंसिपल, गंगुआ केस्ट रोग",
    hara_13_desc:
      "😳घरेलू या व्यावसायिक परिणामों (दिवालियापन, हानि) से संभावित निराशा, करीबी लोगों द्वारा विश्वासघात, और किए गए सभी प्रयासों से अधिकतम और इष्टतम परिणाम प्राप्त करने में असमर्थता।",
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
      "🤠Positif dalam kemandirian dan independensi, perkembangan (awal) yang baru, biasanya diawali oleh suatu hal/pekerjaan/proyek baru, suatu relokasi, perubahan karir, atau langkah penting serupa. Kemandiran dan kekuatan, kemungkinan menjadi seorang yang cenderung individual. Berpotensi memiliki kewenangan / perlawanan terhadap figur yang mendominasi. Lebih banyak peluang - peluang bisnis menguntungkan untuk pribadi tetapi kurang cocok/menguntungkan jika dikerjakan dalam bentuk kerjasama. Akan banyak potensi keberuntungan dalam keuangan serta petualangan - petualangan. Cenderung mendapatkan dukungan dari beberapa sumber. Dalam fase panjang Anda akan mantap dalam  keuangan, kuat, dan sukses bisnis",
    hara_2_desc:
      "🤝Peningkatan koneksi dan kerjasama, dibantu oleh suatu hubungan yang berjalan baik dan lama. Dalam fase pendek berpotensi memiliki koneksi - koneksi baru dalam bisnis atau pergaulan, meningkatnya kesadaran akan rasa syukur terhadap kehidupan , meningkatnya kepekaan terhadap insting kehidupan dan bisnis, memiliki kemauan untuk bermitra dengan orang lain, mudah bernegosiasi dan bijaksana. Dalam fase panjang Dalam fase panjang  lancar dalam hubungan, juga berpotensi sukses, lancarnya keuangan dan perekonomian",
    hara_3_desc:
      "💡Potensi ide dan kreativitas, pembawaan santai dan kenikmatan atas segala hal yang perlu dikendalikan. Dalam fase pendek berpotensi memiliki AKSI kreativitas dan orisinalitas, meningkatnya ekpresi diri. Ini adalah Modal. Penuh inspirasi dan motivasi serta ide-ide kehidupan. Ketika bersosialisasi, anda akan membawa kenyamanan, Berpotensi mengalami hidup yang penuh dengan perjalanan dan menginspirasi orang lain. Akan meningkatnya  kesenangan - kesenangan lain dari aspek material dunia/ Uang",
    hara_4_desc:
      "✔️Potensi karir dan hubungan yang menguat, berpindah untuk bergerak maju, tanggung jawab terselesaikan dengan praktis. Dalam fase pendek berpotensi mendapatkan peluang - peluang bisnis yang menjanjikan, Hilangnya Kesulitan - kesulitan dengan pihak berwenang, Khususnya institusi - institusi serta peraturannya. Keuangan yang grafiknya naik. Kekuatan dan tekadlah  dapat membantu anda mewujudkan rencana - rencana anda. Dalam fase panjang anda berpotensi mengalami perbaikan - perbaikan dalam karir dan keuangan. Anda juga bisa berharap adanya hubungan yang menguat, khususnya terhadap seseorang yang dekat dengan anda",
    hara_5_desc:
      "❌Kecenderungan potensi buruk, apes, cenderung mudah dikelabui, pengkhianatan, celaka, sakit, berakhir buruk. Namanya harus di rubah atau di tambahkan. Mudah di tipu orang, berpotensi sering mengalami kesialan dan keburukan, rata - rata hal negatif yang terjadi dalam parameter ending code yang lain terjadi juga di angka ini. maka sebaiknya berhati - hatilah jika nama anda mengandung Ending Code. selain itu berpotensi mudah ditipu orang, dihianati oleh teman sendiri, dan lainnya",
    hara_6_desc:
      "🏡Potensi berkembang dalam hal kekeluargaan, sosial, membantu tua muda, perbaikan, kesembuhan, kemajuan. Dalam fase pendek ada peluang untuk melibatkan diri dalam keluarga, menyenangkan dan membantu berbagai macam generasi. Berpotensi mengalami ketertarikan dalam masalah - masalah lingkungan dan politik dan juga berpotensi membuat anda menjadi seseorang yang lebih bertanggung jawab. Dalam fase panjang berpotensi mendapatkan prospek - prospek yang kelihatannya amat baik. Di semua area kehidupan anda berpotensi mengalami perbaikan, kesembuhan dan kemajuan",
    hara_7_desc:
      "😠Potensi masalah finansial, konflik emosional (timbul celaka), plin-plan, gangguan syaraf, sel abnormal. Fase pendek : dalam kehidupan akan mengalami kesulitan dalam mengalokasikan dan, mengalami masalah keuangan. Fase panjang : Berpotensi besar menderita kanker dan tumor dan konflik Emosional (contoh cinta segitiga)",
    hara_8_desc:
      "🤕Potensi mengalami perjalanan tidak menyenangkan, harus berhati-hati agar tidak celaka, sakit (pemulihan lama), salah diagnosis, mengakhiri sesuatu secara buruk (berdampak serius)",
    hara_9_desc:
      "🤧Potensi gangguan finansial, gangguan obat atau memasukkan obat, kurang sehat/mengalami penyakit seperti wabah virus dan berakhir dengan buruk (apa saja) karena dilakukan pihak lain",
    hara_11_desc:
      "🤢Potensi gagal usaha, jadi kambing hitam, tekanan atau pengkhianatan psikologis, komplikasi, pisah karena beda prinsip, gangguan kesehatan",
    hara_13_desc:
      "😳Potensi kecewa atas hasil (bangkrut,rugi) rumah tangga maupun bisnis, dikhianati oleh orang dekat, dan ketidakmampuan mendapatkan hasil yang maksimal dan optimal dari segala Usaha yang dijalankan",
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
    // Early return for invalid inputs
    if (!key || typeof key !== "string" || key.trim() === "") {
      return "";
    }

    try {
      // Ensure translations object exists and is valid
      if (
        !translations ||
        typeof translations !== "object" ||
        translations === null
      ) {
        return key;
      }

      // Safely get current language translations with explicit null checks
      const currentLangTranslations =
        translations[language as keyof typeof translations];

      // Try current language first with comprehensive safety checks
      if (
        currentLangTranslations &&
        typeof currentLangTranslations === "object" &&
        currentLangTranslations !== null &&
        !Array.isArray(currentLangTranslations)
      ) {
        const translation =
          currentLangTranslations[key as keyof typeof currentLangTranslations];
        if (
          translation &&
          typeof translation === "string" &&
          translation.trim() !== ""
        ) {
          return translation;
        }
      }

      // Fallback to English with explicit null checks
      const englishTranslations = translations.en;
      if (
        englishTranslations &&
        typeof englishTranslations === "object" &&
        englishTranslations !== null &&
        !Array.isArray(englishTranslations)
      ) {
        const translation =
          englishTranslations[key as keyof typeof englishTranslations];
        if (
          translation &&
          typeof translation === "string" &&
          translation.trim() !== ""
        ) {
          return translation;
        }
      }

      // Return the key itself if no translation found
      return key;
    } catch (error) {
      // Log error but don't throw - graceful degradation
      console.warn(`Translation error for key "${key}":`, error);
      return key;
    }
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
