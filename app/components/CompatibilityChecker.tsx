import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  normalisasiNama,
  formatTanggal,
  checkCompatibility,
  calculateDestiny,
  pythagoreanValues,
  reduksiAngka,
  hitungNilaiNumerologi,
  calculateTimePhysicalMentalEmotionIntuition,
} from "../utils/numerologyUtils";
import { useTranslation } from "./MainApp";

interface CompatibilityCheckerProps {
  isPremium?: boolean;
}

export default function CompatibilityChecker({
  isPremium = true,
}: CompatibilityCheckerProps) {
  const { t, language } = useTranslation();

  // Person 1 state
  const [name1, setName1] = useState("");
  const [normalizedName1, setNormalizedName1] = useState("");
  const [birthdate1, setBirthdate1] = useState(new Date());
  const [selectedDay1, setSelectedDay1] = useState(new Date().getDate());
  const [selectedMonth1, setSelectedMonth1] = useState(
    new Date().getMonth() + 1,
  );
  const [selectedYear1, setSelectedYear1] = useState(new Date().getFullYear());
  const [showDatePicker1, setShowDatePicker1] = useState(false);

  // Person 2 state
  const [name2, setName2] = useState("");
  const [normalizedName2, setNormalizedName2] = useState("");
  const [birthdate2, setBirthdate2] = useState(new Date());
  const [selectedDay2, setSelectedDay2] = useState(new Date().getDate());
  const [selectedMonth2, setSelectedMonth2] = useState(
    new Date().getMonth() + 1,
  );
  const [selectedYear2, setSelectedYear2] = useState(new Date().getFullYear());
  const [showDatePicker2, setShowDatePicker2] = useState(false);

  // Results state
  const [results, setResults] = useState<ReturnType<
    typeof checkCompatibility
  > | null>(null);
  const [calculatedResults, setCalculatedResults] = useState<{
    person1: {
      expression: number;
      time: number;
      heart: number;
      birth: number;
      ultimate: number;
      name: number;
      habit: number;
      planOfExpression: number;
      pointOfIntensification: number;
    };
    person2: {
      expression: number;
      time: number;
      heart: number;
      birth: number;
      ultimate: number;
      name: number;
      habit: number;
      planOfExpression: number;
      pointOfIntensification: number;
    };
    match: {
      percentage: number;
      explanation: string;
    };
    harmony: number;
  } | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);

  const handleNameChange1 = (text: string) => {
    setName1(text);
    setNormalizedName1(normalisasiNama(text));
  };

  const handleNameChange2 = (text: string) => {
    setName2(text);
    setNormalizedName2(normalisasiNama(text));
  };

  const handleDateChange1 = (day: number, month: number, year: number) => {
    setSelectedDay1(day);
    setSelectedMonth1(month);
    setSelectedYear1(year);
    const newDate = new Date(year, month - 1, day);
    setBirthdate1(newDate);
  };

  const handleDateChange2 = (day: number, month: number, year: number) => {
    setSelectedDay2(day);
    setSelectedMonth2(month);
    setSelectedYear2(year);
    const newDate = new Date(year, month - 1, day);
    setBirthdate2(newDate);
  };

  const generateYears = () => {
    const years = [];
    for (let year = 10000; year >= 0; year--) {
      years.push(year);
    }
    return years;
  };

  const generateDays = (month: number, year: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const months = [
    { value: 1, label: t("january") || "January" },
    { value: 2, label: t("february") || "February" },
    { value: 3, label: t("march") || "March" },
    { value: 4, label: t("april") || "April" },
    { value: 5, label: t("may") || "May" },
    { value: 6, label: t("june") || "June" },
    { value: 7, label: t("july") || "July" },
    { value: 8, label: t("august") || "August" },
    { value: 9, label: t("september") || "September" },
    { value: 10, label: t("october") || "October" },
    { value: 11, label: t("november") || "November" },
    { value: 12, label: t("december") || "December" },
  ];

  // Calculate Expression number using Pythagorean method
  const calculateExpression = (name: string): number => {
    return calculateDestiny(name);
  };

  // Calculate Time number from birthdate
  const calculateTime = (birthdate: Date): number => {
    const dd = birthdate.getDate();
    const mm = birthdate.getMonth() + 1;
    const yyyy = birthdate.getFullYear();
    const timeSum = dd + mm + yyyy;
    return reduksiAngka(timeSum);
  };

  // Calculate Heart Desire (vowels only)
  const calculateHeart = (name: string): number => {
    const normalizedName = normalisasiNama(name);
    const vowels = normalizedName.replace(/[^AEIOU]/g, "");
    let total = 0;

    for (const char of vowels) {
      total += pythagoreanValues[char] || 0;
    }

    // Keep as is if 11 or 22, otherwise reduce to single digit
    if (total === 11 || total === 22) {
      return total;
    }
    return reduksiAngka(total);
  };

  // Calculate Birth (single digit from input date dd)
  const calculateBirth = (birthdate: Date): number => {
    const dd = birthdate.getDate();
    return reduksiAngka(dd);
  };

  // Calculate Ultimate (single digit from sum of Time and Expression)
  const calculateUltimate = (time: number, expression: number): number => {
    return reduksiAngka(time + expression);
  };

  // Calculate Name (first word of name using Pythagorean values)
  const calculateName = (name: string): number => {
    const normalizedName = normalisasiNama(name);
    const firstWord = normalizedName.split(" ")[0] || "";
    let total = 0;

    for (const char of firstWord) {
      total += pythagoreanValues[char] || 0;
    }

    return reduksiAngka(total);
  };

  // Calculate Habit (single digit from sum of Pythagorean conversion for first word only)
  const calculateHabit = (name: string): number => {
    const normalizedName = normalisasiNama(name);
    const firstWord = normalizedName.split(" ")[0] || "";
    let total = 0;

    for (const char of firstWord) {
      total += pythagoreanValues[char] || 0;
    }

    return reduksiAngka(total);
  };

  // Calculate Plan of Expression (largest number from physical, mental, emotion, intuition)
  const calculatePlanOfExpression = (name: string, birthdate: Date): number => {
    const { physical, mental, emotion, intuition } =
      calculateTimePhysicalMentalEmotionIntuition(name, birthdate);
    return Math.max(physical, mental, emotion, intuition);
  };

  // Calculate Point of Intensification (single digit from most frequent number in intensity)
  const calculatePointOfIntensification = (name: string): number => {
    const normalizedName = normalisasiNama(name);
    const intensityCount: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };

    // Count frequency of each number
    for (const char of normalizedName) {
      if (char === " ") continue;
      const charCode = char.charCodeAt(0) - 65; // A is 65 in ASCII
      const value = (charCode % 9) + 1;
      intensityCount[value]++;
    }

    // Find the most frequent number
    let maxCount = 0;
    let mostFrequentNumber = 1;

    for (let i = 1; i <= 9; i++) {
      if (intensityCount[i] > maxCount) {
        maxCount = intensityCount[i];
        mostFrequentNumber = i;
      }
    }

    return reduksiAngka(mostFrequentNumber);
  };

  // Get match percentage and explanation based on Time values
  const getMatchData = (
    time1: number,
    time2: number,
  ): { percentage: number; explanation: string } => {
    const matchTable: Record<
      string,
      {
        percentage: number;
        harmonyPercentage: number;
        explanations: {
          id: string;
          en: string;
          fr: string;
          es: string;
          zh: string;
          hi: string;
          ar: string;
        };
      }
    > = {
      "1-1": {
        percentage: 50,
        harmonyPercentage: 5,
        explanations: {
          id: "Kedua orang memiliki sifat kepemimpinan dan kepercayaan diri. Masing-masing mungkin mencoba mengalahkan yang lain dalam permainan tanpa akhir dan itu adalah tebakan siapa yang akan menjadi pemenang. Solusinya dapat ditemukan dalam kompromi dan kerja sama dengan membagi tugas dan hak istimewa. Ini akan lebih mudah dalam kemitraan bisnis tetapi tidak begitu mudah dalam cinta.",
          en: "Both persons have the nature of leadership and self-concern. Each one may try out do the other in a never-ending game and it is anybody's guess who will be the winner. The solution can be found in compromise and co-operation by dividing the duties and privileges. This would be easier in a business partnership but not so easy in love and marriage where both have prestige of their jobs on the one hand and dealing in household chores on the other. The man cannot expect the woman to be waiting for him to serve when he returns home after work. They have to share everything on an equal basis, unless the woman recognises her femininity and calculatively keeps a slight margin for adjustment. The intimate side of their relationship should prove to be very good. Both of them are passionate and demonstrative and they should be inventive and enjoying each other's company. They may make an allowance for freedom to each other as far as seeking pleasure is concerned and won't be much worried about what the other one is doing and where.",
          Fr: "Les deux personnes possèdent des qualités de leadership et de confiance en soi. Chacun peut essayer de surpasser l'autre dans un jeu sans fin et on ne peut que deviner qui sera le vainqueur. La solution peut être trouvée dans le compromis et la coopération en partageant les tâches et les privilèges. Ce sera plus facile dans un partenariat commercial mais pas si facile en amour.",
          es: "Ambas personas poseen cualidades de liderazgo y confianza en sí mismas. Cada uno puede intentar superar al otro en un juego interminable y solo se puede adivinar quién será el ganador. La solución se puede encontrar en el compromiso y la cooperación compartiendo tareas y privilegios. Esto será más fácil en una sociedad comercial, pero no tan fácil en el amor.",
          zh: "两个人都有领导才能和自信。每个人都可能在无休止的游戏中试图击败对方，谁会成为赢家只能猜测。解决方案可以在妥协和合作中找到，通过分担任务和特权。这在商业伙伴关系中会更容易，但在爱情中却不那么容易。",
          hi: "दोनों व्यक्तियों में नेतृत्व और आत्म-सम्मान की भावना होती है। हर कोई एक कभी न खत्म होने वाले खेल में दूसरे से आगे निकलने की कोशिश कर सकता है और यह किसी का भी अनुमान है कि विजेता कौन होगा। इसका समाधान कर्तव्यों और विशेषाधिकारों को बांटकर समझौते और सहयोग में पाया जा सकता है। यह एक व्यावसायिक साझेदारी में आसान होगा लेकिन प्यार और शादी में इतना आसान नहीं है जहाँ दोनों के पास एक तरफ अपनी नौकरी की प्रतिष्ठा होती है और दूसरी तरफ घरेलू कामों से निपटना होता है। पुरुष यह उम्मीद नहीं कर सकता कि महिला काम के बाद घर लौटने पर उसकी सेवा के लिए इंतजार कर रही होगी। उन्हें सब कुछ समान आधार पर साझा करना होगा, जब तक कि महिला अपनी स्त्रीत्व को नहीं पहचानती और समायोजन के लिए गणनात्मक रूप से थोड़ी सी गुंजाइश रखती है। उनके रिश्ते का अंतरंग पक्ष बहुत अच्छा साबित होना चाहिए। वे दोनों भावुक और प्रदर्शनकारी होते हैं और उन्हें एक-दूसरे की कंपनी का आविष्कारशील और आनंददायक होना चाहिए। वे एक-दूसरे को आनंद की तलाश के मामले में स्वतंत्रता दे सकते हैं और इस बात की ज्यादा चिंता नहीं करेंगे कि दूसरा क्या कर रहा है और कहाँ है।",
          ar: "يتمتع كلا الشخصين بصفات القيادة والثقة بالنفس. قد يحاول كل منهما التغلب على الآخر في لعبة لا نهاية لها، ويبقى التكهن بمن سيكون الفائز. يمكن إيجاد الحل في التسوية والتعاون من خلال تقسيم المهام والامتيازات. سيكون هذا أسهل في شراكة عمل، ولكنه ليس بهذه السهولة في الحب.",
        },
      },
      "1-2": {
        percentage: 75,
        harmonyPercentage: 7.5,
        explanations: {
          id: "Kombinasi ideal, terutama jika 'pria 1' dan 'wanita 2' tertarik satu sama lain. Pria 1 mendominasi sementara wanita 2 tunduk dan melengkapi satu sama lain dengan sangat baik. Wanita 2 romantis, setia, nyonya rumah yang terlahir, pasif, dan selalu bersedia melakukan apa yang diinginkan pria 1. Dia akan menunggu pria pulang di malam hari dan memberinya kebahagiaan rumah tangga dan membantu semua urusan keluarga. Dia juga sangat puas karena dia memberikan segalanya kepada suaminya. Pria 1 memiliki minat di luar tetapi wanita 2 adalah untuk rumah dan ingin menghabiskan malam minggu bersamanya. Perawatan harus dilakukan agar tidak menyinggung pria 2 karena kecemburuan. Dan itu mudah membutuhkan keamanan yang dapat disediakan pria 1",
          en: "An ideal combination, especially if 'man is 1' and the 'woman is 2' drawn to each other as opposite attract. 1 Man is dominating while 2 woman is submissive and they complement each other very well. 2 woman is romantic, loyal, a born hostess, passive and always willing to do what 1 man wants. She will wait for him in the evening, look after him and give him conjugal bliss and assist him in all family dealings. She too is quite content because he gives her whatever she wants. 1 Man has outside interest but 2 woman is for the home and would like to spend the evening always with her man. Care should be taken not to offend her because 2's are jealous and easily provoked. Also 2 needs a security which 1 can provide.",
          Fr: "Une combinaison idéale, surtout si l'homme 1 et la femme 2 sont attirés l'un par l'autre. L'homme 1 est dominant tandis que la femme 2 est soumise et ils se complètent très bien. La femme 2 est romantique, loyale, une maîtresse de maison née, passive et toujours prête à faire ce que l'homme 1 désire. Elle attendra que l'homme rentre à la maison le soir et lui donnera le bonheur domestique et aidera dans toutes les affaires familiales. Elle est également très satisfaite car elle donne tout à son mari. L'homme 1 a des intérêts à l'extérieur mais la femme 2 est pour la maison et veut passer les soirées du week-end avec lui. Il faut veiller à ne pas offenser l'homme 2 par jalousie. Et c'est facile, cela nécessite la sécurité que l'homme 1 peut fournir.",
          es: "Una combinación ideal, especialmente si el 'hombre 1' y la 'mujer 2' se sienten atraídos el uno por el otro. El hombre 1 es dominante mientras que la mujer 2 es sumisa y se complementan muy bien. La mujer 2 es romántica, leal, una anfitriona nata, pasiva y siempre dispuesta a hacer lo que el hombre 1 desea. Esperará a que el hombre vuelva a casa por la noche y le dará felicidad doméstica y ayudará en todos los asuntos familiares. También está muy satisfecha porque le da todo a su marido. El hombre 1 tiene intereses fuera, pero la mujer 2 es para el hogar y quiere pasar las noches de fin de semana con él. Hay que tener cuidado de no ofender al hombre 2 por celos. Y es fácil, requiere la seguridad que el hombre 1 puede proporcionar.",
          zh: "一个理想的组合，特别是如果“男1”和“女2”彼此吸引。男1占主导地位，而女2则顺从，他们彼此很好地互补。女2浪漫、忠诚、是天生的女主人、被动，并且总是愿意做男1想做的事。她会等男人晚上回家，给他家庭的幸福，并帮助处理所有家庭事务。她也非常满意，因为她把一切都给了丈夫。男1在外面有兴趣，但女2是为了家庭，并希望和他一起度过周末的晚上。必须注意不要因为嫉妒而冒犯男2。这很容易，它需要男1可以提供的安全感。",
          hi: "एक आदर्श संयोजन, खासकर अगर 'पुरुष 1' और 'महिला 2' एक-दूसरे के प्रति विपरीत आकर्षण के रूप में आकर्षित होते हैं। पुरुष 1 हावी होता है जबकि महिला 2 विनम्र होती है और वे एक-दूसरे के बहुत अच्छे पूरक होते हैं। महिला 2 रोमांटिक, वफादार, जन्मजात परिचारिका, निष्क्रिय और हमेशा वही करने को तैयार रहती है जो पुरुष 1 चाहता है। वह शाम को उसका इंतजार करेगी, उसकी देखभाल करेगी और उसे वैवाहिक आनंद देगी और सभी पारिवारिक मामलों में उसकी सहायता करेगी। वह भी काफी संतुष्ट रहती है क्योंकि वह उसे वह सब कुछ देता है जो वह चाहती है। पुरुष 1 की बाहरी रुचियां होती हैं लेकिन महिला 2 घर के लिए होती है और शाम को हमेशा अपने पुरुष के साथ बिताना चाहेगी। उसका अपमान न करने का ध्यान रखा जाना चाहिए क्योंकि 2 ईर्ष्यालु और आसानी से उत्तेजित होने वाले होते हैं। साथ ही 2 को सुरक्षा की आवश्यकता होती है जो 1 प्रदान कर सकता है।",
          ar: "مزيج مثالي، خاصة إذا كان 'الرجل 1' و 'المرأة 2' منجذبين لبعضهما البعض. الرجل 1 يسيطر بينما المرأة 2 تخضع وتكملان بعضهما البعض بشكل جيد للغاية. المرأة 2 رومانسية، مخلصة، ربة منزل بالفطرة، سلبية، ومستعدة دائمًا لفعل ما يريده الرجل 1. ستنتظر عودة الرجل إلى المنزل في المساء وتمنحه السعادة المنزلية وتساعد في جميع شؤون الأسرة. هي أيضًا راضية جدًا لأنها تمنح كل شيء لزوجها. لدى الرجل 1 اهتمامات في الخارج ولكن المرأة 2 مخصصة للمنزل وتريد قضاء ليلة السبت معه. يجب توخي الحذر حتى لا تسيء إلى الرجل 2 بسبب الغيرة. وهذا يتطلب بسهولة الأمان الذي يمكن أن يوفره الرجل 1.",
        },
      },
      "1-11": {
        percentage: 75,
        harmonyPercentage: 7.5,
        explanations: {
          id: "Kombinasi ideal, terutama jika 'pria 1' dan 'wanita 2' tertarik satu sama lain. Pria 1 mendominasi sementara wanita 2 tunduk dan melengkapi satu sama lain dengan sangat baik. Wanita 2 romantis, setia, nyonya rumah yang terlahir, pasif, dan selalu bersedia melakukan apa yang diinginkan pria 1. Dia akan menunggu pria pulang di malam hari dan memberinya kebahagiaan rumah tangga dan membantu semua urusan keluarga. Dia juga sangat puas karena dia memberikan segalanya kepada suaminya. Pria 1 memiliki minat di luar tetapi wanita 2 adalah untuk rumah dan ingin menghabiskan malam minggu bersamanya. Perawatan harus dilakukan agar tidak menyinggung pria 2 karena kecemburuan. Dan itu mudah membutuhkan keamanan yang dapat disediakan pria 1",
          en: "An ideal combination, especially if 'man is 1' and the 'woman is 2' drawn to each other as opposite attract. 1 Man is dominating while 2 woman is submissive and they complement each other very well. 2 woman is romantic, loyal, a born hostess, passive and always willing to do what 1 man wants. She will wait for him in the evening, look after him and give him conjugal bliss and assist him in all family dealings. She too is quite content because he gives her whatever she wants. 1 Man has outside interest but 2 woman is for the home and would like to spend the evening always with her man. Care should be taken not to offend her because 2's are jealous and easily provoked. Also 2 needs a security which 1 can provide.",
          Fr: "Une combinaison idéale, surtout si l'homme 1 et la femme 2 sont attirés l'un par l'autre. L'homme 1 est dominant tandis que la femme 2 est soumise et ils se complètent très bien. La femme 2 est romantique, loyale, une maîtresse de maison née, passive et toujours prête à faire ce que l'homme 1 désire. Elle attendra que l'homme rentre à la maison le soir et lui donnera le bonheur domestique et aidera dans toutes les affaires familiales. Elle est également très satisfaite car elle donne tout à son mari. L'homme 1 a des intérêts à l'extérieur mais la femme 2 est pour la maison et veut passer les soirées du week-end avec lui. Il faut veiller à ne pas offenser l'homme 2 par jalousie. Et c'est facile, cela nécessite la sécurité que l'homme 1 peut fournir.",
          es: "Una combinación ideal, especialmente si el 'hombre 1' y la 'mujer 2' se sienten atraídos el uno por el otro. El hombre 1 es dominante mientras que la mujer 2 es sumisa y se complementan muy bien. La mujer 2 es romántica, leal, una anfitriona nata, pasiva y siempre dispuesta a hacer lo que el hombre 1 desea. Esperará a que el hombre vuelva a casa por la noche y le dará felicidad doméstica y ayudará en todos los asuntos familiares. También está muy satisfecha porque le da todo a su marido. El hombre 1 tiene intereses fuera, pero la mujer 2 es para el hogar y quiere pasar las noches de fin de semana con él. Hay que tener cuidado de no ofender al hombre 2 por celos. Y es fácil, requiere la seguridad que el hombre 1 puede proporcionar.",
          zh: "一个理想的组合，特别是如果“男1”和“女2”彼此吸引。男1占主导地位，而女2则顺从，他们彼此很好地互补。女2浪漫、忠诚、是天生的女主人、被动，并且总是愿意做男1想做的事。她会等男人晚上回家，给他家庭的幸福，并帮助处理所有家庭事务。她也非常满意，因为她把一切都给了丈夫。男1在外面有兴趣，但女2是为了家庭，并希望和他一起度过周末的晚上。必须注意不要因为嫉妒而冒犯男2。这很容易，它需要男1可以提供的安全感。",
          hi: "Penjelasan_Hi",
          ar: "مزيج مثالي، خاصة إذا كان 'الرجل 1' و 'المرأة 2' منجذبين لبعضهما البعض. الرجل 1 يسيطر بينما المرأة 2 تخضع وتكملان بعضهما البعض بشكل جيد للغاية. المرأة 2 رومانسية، مخلصة، ربة منزل بالفطرة، سلبية، ومستعدة دائمًا لفعل ما يريده الرجل 1. ستنتظر عودة الرجل إلى المنزل في المساء وتمنحه السعادة المنزلية وتساعد في جميع شؤون الأسرة. هي أيضًا راضية جدًا لأنها تمنح كل شيء لزوجها. لدى الرجل 1 اهتمامات في الخارج ولكن المرأة 2 مخصصة للمنزل وتريد قضاء ليلة السبت معه. يجب توخي الحذر حتى لا تسيء إلى الرجل 2 بسبب الغيرة. وهذا يتطلب بسهولة الأمان الذي يمكن أن يوفره الرجل 1.",
        },
      },
      "1-3": {
        percentage: 75,
        harmonyPercentage: 7.5,
        explanations: {
          id: "Angka 1 dan 3 cukup cocok satu sama lain dan mereka harus menjadi pasangan yang baik. Pria 1 memiliki kualitas kepemimpinan yang baik di tempat kerja atau di rumah. Dia akan menyukai pasangannya untuk menjadi pintar, berpakaian bagus, dan menawan dengan maskulinitas Pria 1. Pria 1 bertanggung jawab dan sangat mewah sementara wanita 3 bisa boros dan sangat sembrono. Oleh karena itu, dalam rumah tangga, Pria 1 akan memulai, demonstratif, dan bergairah sementara wanita 3 memiliki cinta akan variasi dan stimulasi. Keduanya saling melengkapi dan sangat cocok satu sama lain. Jika pria 3 dan wanita 1 membuat pasangan yang sama baiknya dengan sedikit pertukaran peran. Keduanya sangat lincah dan dengan pikiran serta perasaan yang sedikit berubah satu sama lain.",
          en: "Number 1 and 3 are quite suitable to each other and they should make a good couple. The 1 Man has leadership qualities whether at work or in the home. He would like his mate to be smart, well dressed and charming which the 3 woman is. She is talented and versatile and is very well satisfied with the masculinity of the 1 Man. The 1 Man is responsible and rarely extravagant while the 3 woman can be wasteful and even frivolous. Hence in the housekeeping they will have to compromise and adjust. On the intimate side, 1 Man is initiating, demonstrative and passionate while 3 woman has a love of variety and stimulation. So the two of them complement each other and are well suited to each other.",
          Fr: "Les nombres 1 et 3 sont assez compatibles l'un avec l'autre et ils devraient former un bon couple. L'homme 1 a de bonnes qualités de leadership au travail ou à la maison. Il aimera que sa partenaire soit intelligente, bien habillée et charmante avec la masculinité de l'homme 1. L'homme 1 est responsable et très extravagant tandis que la femme 3 peut être dépensière et très frivole. Par conséquent, dans le ménage, l'homme 1 sera initiateur, démonstratif et passionné tandis que la femme 3 a un amour de la variété et de la stimulation. Les deux se complètent et sont très compatibles l'un avec l'autre. Si l'homme est 3 et la femme 1, ils forment un couple tout aussi bon avec un léger échange de rôles. Les deux sont très vifs et avec des esprits et des sentiments légèrement changeants l'un envers l'autre.",
          es: "Los números 1 y 3 son bastante compatibles entre sí y deberían formar una buena pareja. El hombre 1 tiene buenas cualidades de liderazgo en el trabajo o en casa. Le gustará que su pareja sea inteligente, bien vestida y encantadora con la masculinidad del Hombre 1. El hombre 1 es responsable y muy extravagante mientras que la mujer 3 puede ser derrochadora y muy frívola. Por lo tanto, en el hogar, el Hombre 1 será iniciador, demostrativo y apasionado mientras que la mujer 3 tiene un amor por la variedad y la estimulación. Ambos se complementan y son muy compatibles entre sí. Si el hombre es 3 y la mujer 1, forman una pareja igualmente buena con un ligero intercambio de roles. Ambos son muy animados y con mentes y sentimientos ligeramente cambiantes el uno hacia el otro.",
          zh: "数字1和3彼此非常相配，他们应该是一对好伴侣。男1在工作或家庭中具有良好的领导才能。他会喜欢他的伴侣聪明、衣着得体、并被男1的阳刚之气所吸引。男1负责任且非常奢侈，而女3则可能浪费且非常轻浮。因此，在家庭中，男1将是发起者、表现力和热情，而女3则热爱变化和刺激。两者互补，彼此非常相配。如果男人是3，女人是1，他们会组成一个同样好的伴侣，角色略有交换。两者都非常活泼，彼此的思想和感情略有变化。",
          hi: "दोनों व्यक्तियों में नेतृत्व और आत्म-सम्मान की भावना होती है। हर कोई एक कभी न खत्म होने वाले खेल में दूसरे से आगे निकलने की कोशिश कर सकता है और यह किसी का भी अनुमान है कि विजेता कौन होगा। इसका समाधान कर्तव्यों और विशेषाधिकारों को बांटकर समझौते और सहयोग में पाया जा सकता है। यह एक व्यावसायिक साझेदारी में आसान होगा लेकिन प्यार और शादी में इतना आसान नहीं है जहाँ दोनों के पास एक तरफ अपनी नौकरी की प्रतिष्ठा होती है और दूसरी तरफ घरेलू कामों से निपटना होता है। पुरुष यह उम्मीद नहीं कर सकता कि महिला काम के बाद घर लौटने पर उसकी सेवा के लिए इंतजार कर रही होगी। उन्हें सब कुछ समान आधार पर साझा करना होगा, जब तक कि महिला अपनी स्त्रीत्व को नहीं पहचानती और समायोजन के लिए गणनात्मक रूप से थोड़ी सी गुंजाइश रखती है। उनके रिश्ते का अंतरंग पक्ष बहुत अच्छा साबित होना चाहिए। वे दोनों भावुक और प्रदर्शनकारी होते हैं और उन्हें एक-दूसरे की कंपनी का आविष्कारशील और आनंददायक होना चाहिए। वे एक-दूसरे को आनंद की तलाश के मामले में स्वतंत्रता दे सकते हैं और इस बात की ज्यादा चिंता नहीं करेंगे कि दूसरा क्या कर रहा है और कहाँ है।",
          ar: "الرقمان 1 و 3 متوافقان تمامًا مع بعضهما البعض ويجب أن يكونا زوجين جيدين. يتمتع الرجل 1 بصفات قيادية جيدة في العمل أو في المنزل. سيحب أن تكون شريكته ذكية، وأنيقة الملبس، وساحرة مع رجولة الرجل 1. الرجل 1 مسؤول ومترف للغاية بينما يمكن أن تكون المرأة 3 مسرفة ومتهورة جدًا. لذلك، في المنزل، سيبادر الرجل 1، وسيكون استعراضيًا وعاطفيًا بينما تحب المرأة 3 التنوع والإثارة. كلاهما يكملان بعضهما البعض ومتوافقان جدًا. إذا شكل الرجل 3 والمرأة 1 زوجين جيدين بنفس القدر مع تبادل طفيف في الأدوار. كلاهما حيويان للغاية ومع عقول ومشاعر متغيرة قليلاً تجاه بعضهما البعض.",
        },
      },
      "1-4": {
        percentage: 25,
        harmonyPercentage: 2.5,
        explanations: {
          id: "Hubungan tidak direkomendasikan karena mereka memiliki kepribadian yang bertentangan, mereka memiliki pandangan yang berbeda dan pendapat yang bertentangan. Ini akan menjadi tugas yang berat untuk menyatukan mereka. Mereka harmonis dalam urusan bisnis sejauh hubungan yang baik secara keseluruhan 1 dapat digabungkan dengan sistem dan urutan 4 dan menghasilkan hasil yang baik. Dalam kehidupan pribadi, No. 1 spontan dan impulsif sementara No. 4 diberikan pada rutinitas, ketertiban, dan lambat. Mereka umumnya acuh tak acuh terhadap seks. Wanita 1 menyukai banyak kegembiraan dan petualangan sementara pria 4 adalah yang sebaliknya.",
          en: "The relationship is not recommended because they have conflicting personalities, they have different views and opinions and the compatibility is not likely to be there. It will be an uphill task to bring them together. They are harmonious in business matters to a good extent since the originality of 1 can combine with the system and order of 4 and produce good results. In personal life No. 1 is spontaneous and impulsive while No. 4 is given to routine, orderliness and is slow. They are generally indifferent towards sex. The 1 woman likes a lot of excitement and adventure while the 4 man is the other way round.",
          Fr: "Une relation n'est pas recommandée car ils ont des personnalités contradictoires, ils ont des points de vue différents et des opinions contradictoires. Ce sera une tâche ardue de les réunir. Ils sont harmonieux dans les affaires commerciales dans la mesure où une bonne relation globale 1 peut être combinée avec le système et l'ordre de 4 et produire de bons résultats. Dans la vie privée, le n°1 est spontané et impulsif tandis que le n°4 est porté sur la routine, l'ordre et est lent. Ils sont généralement indifférents au sexe. La femme 1 aime beaucoup d'excitation et d'aventure tandis que l'homme 4 est tout le contraire.",
          es: "No se recomienda una relación porque tienen personalidades conflictivas, tienen puntos de vista diferentes y opiniones contradictorias. Será una tarea ardua unirlos. Son armoniosos en los asuntos comerciales en la medida en que una buena relación general 1 se puede combinar con el sistema y el orden de 4 y producir buenos resultados. En la vida privada, el Nº 1 es espontáneo e impulsivo mientras que el Nº 4 se dedica a la rutina, el orden y es lento. Generalmente son indiferentes al sexo. A la mujer 1 le gusta mucha emoción y aventura, mientras que el hombre 4 es todo lo contrario.",
          zh: "不推荐建立关系，因为他们性格冲突，观点不同，意见相左。将他们聚集在一起将是一项艰巨的任务。他们在商业事务中是和谐的，只要一个良好的整体关系1可以与4的系统和顺序相结合并产生良好的结果。在私人生活中，1号是自发和冲动的，而4号则倾向于常规、秩序和缓慢。他们通常对性冷淡。女1喜欢大量的兴奋和冒险，而男4则相反。",
          hi: "एक आदर्श संयोजन, खासकर अगर 'पुरुष 1' और 'महिला 2' एक-दूसरे के प्रति विपरीत आकर्षण के रूप में आकर्षित होते हैं। पुरुष 1 हावी होता है जबकि महिला 2 विनम्र होती है और वे एक-दूसरे के बहुत अच्छे पूरक होते हैं। महिला 2 रोमांटिक, वफादार, जन्मजात परिचारिका, निष्क्रिय और हमेशा वही करने को तैयार रहती है जो पुरुष 1 चाहता है। वह शाम को उसका इंतजार करेगी, उसकी देखभाल करेगी और उसे वैवाहिक आनंद देगी और सभी पारिवारिक मामलों में उसकी सहायता करेगी। वह भी काफी संतुष्ट रहती है क्योंकि वह उसे वह सब कुछ देता है जो वह चाहती है। पुरुष 1 की बाहरी रुचियां होती हैं लेकिन महिला 2 घर के लिए होती है और शाम को हमेशा अपने पुरुष के साथ बिताना चाहेगी। उसका अपमान न करने का ध्यान रखा जाना चाहिए क्योंकि 2 ईर्ष्यालु और आसानी से उत्तेजित होने वाले होते हैं। साथ ही 2 को सुरक्षा की आवश्यकता होती है जो 1 प्रदान कर सकता है।",
          ar: "لا يوصى بالعلاقة لأن لديهما شخصيات متضاربة، ووجهات نظر مختلفة وآراء متعارضة. ستكون مهمة شاقة لجمعهما. هما متناغمان في شؤون العمل حيث يمكن دمج العلاقة الجيدة الشاملة للرقم 1 مع نظام وترتيب الرقم 4 وتحقيق نتائج جيدة. في الحياة الشخصية، الرقم 1 عفوي ومندفع بينما الرقم 4 يميل إلى الروتين والنظام والبطء. هما بشكل عام غير مبالين بالجنس. تحب المرأة 1 الكثير من الإثارة والمغامرة بينما الرجل 4 هو العكس تمامًا.",
        },
      },
      "1-22": {
        percentage: 25,
        harmonyPercentage: 2.5,
        explanations: {
          id: "Hubungan tidak direkomendasikan karena mereka memiliki kepribadian yang bertentangan, mereka memiliki pandangan yang berbeda dan pendapat yang bertentangan. Ini akan menjadi tugas yang berat untuk menyatukan mereka. Mereka harmonis dalam urusan bisnis sejauh hubungan yang baik secara keseluruhan 1 dapat digabungkan dengan sistem dan urutan 4 dan menghasilkan hasil yang baik. Dalam kehidupan pribadi, No. 1 spontan dan impulsif sementara No. 4 diberikan pada rutinitas, ketertiban, dan lambat. Mereka umumnya acuh tak acuh terhadap seks. Wanita 1 menyukai banyak kegembiraan dan petualangan sementara pria 4 adalah yang sebaliknya.",
          en: "The relationship is not recommended because they have conflicting personalities, they have different views and opinions and the compatibility is not likely to be there. It will be an uphill task to bring them together. They are harmonious in business matters to a good extent since the originality of 1 can combine with the system and order of 4 and produce good results. In personal life No. 1 is spontaneous and impulsive while No. 4 is given to routine, orderliness and is slow. They are generally indifferent towards sex. The 1 woman likes a lot of excitement and adventure while the 4 man is the other way round.",
          Fr: "Une relation n'est pas recommandée car ils ont des personnalités contradictoires, ils ont des points de vue différents et des opinions contradictoires. Ce sera une tâche ardue de les réunir. Ils sont harmonieux dans les affaires commerciales dans la mesure où une bonne relation globale 1 peut être combinée avec le système et l'ordre de 4 et produire de bons résultats. Dans la vie privée, le n°1 est spontané et impulsif tandis que le n°4 est porté sur la routine, l'ordre et est lent. Ils sont généralement indifférents au sexe. La femme 1 aime beaucoup d'excitation et d'aventure tandis que l'homme 4 est tout le contraire.",
          es: "No se recomienda una relación porque tienen personalidades conflictivas, tienen puntos de vista diferentes y opiniones contradictorias. Será una tarea ardua unirlos. Son armoniosos en los asuntos comerciales en la medida en que una buena relación general 1 se puede combinar con el sistema y el orden de 4 y producir buenos resultados. En la vida privada, el Nº 1 es espontáneo e impulsivo mientras que el Nº 4 se dedica a la rutina, el orden y es lento. Generalmente son indiferentes al sexo. A la mujer 1 le gusta mucha emoción y aventura, mientras que el hombre 4 es todo lo contrario.",
          zh: "不推荐建立关系，因为他们性格冲突，观点不同，意见相左。将他们聚集在一起将是一项艰巨的任务。他们在商业事务中是和谐的，只要一个良好的整体关系1可以与4的系统和顺序相结合并产生良好的结果。在私人生活中，1号是自发和冲动的，而4号则倾向于常规、秩序和缓慢。他们通常对性冷淡。女1喜欢大量的兴奋和冒险，而男4则相反。",
          hi: "एक आदर्श संयोजन, खासकर अगर 'पुरुष 1' और 'महिला 2' एक-दूसरे के प्रति विपरीत आकर्षण के रूप में आकर्षित होते हैं। पुरुष 1 हावी होता है जबकि महिला 2 विनम्र होती है और वे एक-दूसरे के बहुत अच्छे पूरक होते हैं। महिला 2 रोमांटिक, वफादार, जन्मजात परिचारिका, निष्क्रिय और हमेशा वही करने को तैयार रहती है जो पुरुष 1 चाहता है। वह शाम को उसका इंतजार करेगी, उसकी देखभाल करेगी और उसे वैवाहिक आनंद देगी और सभी पारिवारिक मामलों में उसकी सहायता करेगी। वह भी काफी संतुष्ट रहती है क्योंकि वह उसे वह सब कुछ देता है जो वह चाहती है। पुरुष 1 की बाहरी रुचियां होती हैं लेकिन महिला 2 घर के लिए होती है और शाम को हमेशा अपने पुरुष के साथ बिताना चाहेगी। उसका अपमान न करने का ध्यान रखा जाना चाहिए क्योंकि 2 ईर्ष्यालु और आसानी से उत्तेजित होने वाले होते हैं। साथ ही 2 को सुरक्षा की आवश्यकता होती है जो 1 प्रदान कर सकता है।",
          ar: "لا يوصى بالعلاقة لأن لديهما شخصيات متضاربة، ووجهات نظر مختلفة وآراء متعارضة. ستكون مهمة شاقة لجمعهما. هما متناغمان في شؤون العمل حيث يمكن دمج العلاقة الجيدة الشاملة للرقم 1 مع نظام وترتيب الرقم 4 وتحقيق نتائج جيدة. في الحياة الشخصية، الرقم 1 عفوي ومندفع بينما الرقم 4 يميل إلى الروتين والنظام والبطء. هما بشكل عام غير مبالين بالجنس. تحب المرأة 1 الكثير من الإثارة والمغامرة بينما الرجل 4 هو العكس تمامًا.",
        },
      },
      "1-5": {
        percentage: 25,
        harmonyPercentage: 2.5,
        explanations: {
          id: "Keduanya tidak bisa bersama untuk waktu yang lama. No. 1 ditentukan, mantap, dan berorientasi karier sementara No. 5 serbaguna, berubah-ubah, dan seksi. Hubungan menjadi lebih buruk ketika pria adalah 1 dan wanita adalah 5. Wanita 5 tidak menikah pada awal kehidupan kecuali dia memiliki hubungan pranikah. Mereka berdua agresif dan situasinya cenderung sering memburuk. Sulit bagi mereka untuk berkompromi. Hanya kehidupan pribadi yang mungkin membuat mereka tetap bersama jika mereka bisa berkompromi dalam masalah lain. Pria 1 kuat, demonstratif, dan petualang sementara wanita 5 dapat menyesuaikan diri dalam masalah seks. Keduanya dapat cocok satu sama lain. Jika pria adalah 5 dia lebih cenderung memprovokasi seks tetapi wanita 1 juga bisa menyesuaikan diri dan keduanya bisa menjadi pasangan yang baik.",
          en: "The two cannot go together for a long time. No. 1 is determined, steady and career minded while No. 5 is versatile, changeable and sexy. The relation is still worse when the man is 1 and the woman is 5. The 5 woman does not marry early in life unless she has pre-marital relationship. They are both aggressive and the situation is likely to flare up quite often. It is difficult for them to come to a compromise. It is only the private life which may keep them together if they can compromise on other issues. The 1 Man is strong, demonstrative and adventurous while the 5 woman can adjust in matters of sex. So the two can be suited to one another. If the man is 5 he is more prone to sex but the 1 woman too can adjust and the two can make a good couple.",
          Fr: "Les deux ne peuvent pas être ensemble pendant longtemps. Le n°1 est déterminé, stable et axé sur la carrière tandis que le n°5 est polyvalent, changeant et sexy. La relation s'aggrave lorsque l'homme est 1 et la femme est 5. La femme 5 ne se marie pas au début de la vie à moins qu'elle n'ait des relations prénuptiales. Ils sont tous les deux agressifs et la situation a tendance à se détériorer souvent. Il leur est difficile de faire des compromis. Seule la vie privée peut les maintenir ensemble s'ils peuvent faire des compromis sur d'autres questions. L'homme 1 est fort, démonstratif et aventureux tandis que la femme 5 est adaptable en matière de sexe. Les deux peuvent être compatibles l'un avec l'autre. Si l'homme est 5, il est plus susceptible de provoquer le sexe mais la femme 1 peut aussi être adaptable et les deux peuvent former un bon couple.",
          es: "Los dos no pueden estar juntos por mucho tiempo. El Nº 1 es decidido, firme y orientado a la carrera, mientras que el Nº 5 es versátil, cambiante y sexy. La relación empeora cuando el hombre es 1 y la mujer es 5. La mujer 5 no se casa al principio de la vida a menos que tenga relaciones prematrimoniales. Ambos son agresivos y la situación tiende a deteriorarse con frecuencia. Les resulta difícil llegar a un compromiso. Solo la vida privada puede mantenerlos juntos si pueden comprometerse en otros asuntos. El hombre 1 es fuerte, demostrativo y aventurero, mientras que la mujer 5 es adaptable en cuestiones de sexo. Los dos pueden ser compatibles entre sí. Si el hombre es 5, es más propenso a provocar el sexo, pero la mujer 1 también puede ser adaptable y los dos pueden formar una buena pareja.",
          zh: "两人不能长时间在一起。1号是坚定的、稳重的和事业心强的，而5号是多才多艺的、善变的和性感的。当男人是1，女人是5时，关系会变得更糟。女5除非有婚前关系，否则不会在生命的早期结婚。他们俩都很有攻击性，情况往往会经常恶化。他们很难妥协。如果他们能在其他问题上妥协，只有私人生活可能会让他们在一起。男1是强壮的、表现力的和冒险的，而女5在性问题上是适应性强的。两人可以彼此相配。如果男人是5，他更倾向于挑起性，但女1也可以适应，两人可以成为一对好伴侣。",
          hi: "नंबर 1 और 3 एक-दूसरे के लिए काफी उपयुक्त हैं और उन्हें एक अच्छा जोड़ा बनाना चाहिए। पुरुष 1 में काम पर या घर पर नेतृत्व के गुण होते हैं। वह चाहेगा कि उसका साथी स्मार्ट, अच्छे कपड़े पहने और आकर्षक हो जो कि महिला 3 है। वह प्रतिभाशाली और बहुमुखी है और पुरुष 1 की मर्दानगी से बहुत संतुष्ट है। पुरुष 1 जिम्मेदार है और शायद ही कभी खर्चीला होता है जबकि महिला 3 फिजूलखर्ची और तुच्छ भी हो सकती है। इसलिए गृहस्थी में उन्हें समझौता और समायोजन करना होगा। अंतरंग पक्ष में, पुरुष 1 पहल करने वाला, प्रदर्शनकारी और भावुक होता है जबकि महिला 3 को विविधता और उत्तेजना से प्यार होता है। इसलिए वे दोनों एक-दूसरे के पूरक हैं और एक-दूसरे के लिए अच्छी तरह से अनुकूल हैं।",
          ar: "لا يمكن أن يكونا معًا لفترة طويلة. الرقم 1 مصمم، ثابت، وموجه نحو الحياة المهنية بينما الرقم 5 متعدد المواهب، متقلب، ومثير. تصبح العلاقة أسوأ عندما يكون الرجل هو 1 والمرأة هي 5. المرأة 5 لا تتزوج في وقت مبكر من حياتها إلا إذا كانت لديها علاقة قبل الزواج. كلاهما عدوانيان ويميل الوضع إلى التدهور بشكل متكرر. من الصعب عليهما التوصل إلى حل وسط. قد تبقيهما الحياة الشخصية فقط معًا إذا كانا يستطيعان التنازل في مسائل أخرى. الرجل 1 قوي، استعراضي، ومغامر بينما المرأة 5 قابلة للتكيف في مسائل الجنس. يمكن أن يتوافق كلاهما مع بعضهما البعض. إذا كان الرجل هو 5، فمن المرجح أن يثير الجنس ولكن المرأة 1 يمكنها أيضًا التكيف ويمكن أن يكونا زوجين جيدين.",
        },
      },
      "1-6": {
        percentage: 75,
        harmonyPercentage: 7.5,
        explanations: {
          id: "Pasangan yang seimbang dan berpenyesuaian baik yang melengkapi kebutuhan satu sama lain. Pria 1 berorientasi karier dan wanita 6 adalah orang yang dapat diandalkan dengan rasa tanggung jawab. Dia adalah nyonya rumah yang baik dan ibu rumah tangga yang harmonis yang dapat memaafkan calon suami 1. Jika wanita 1 dia memiliki misi dalam hidup dan mungkin berorientasi karier atau turun ke bumi. Tapi dia bertindak seperti nyonya rumah yang merupakan persyaratan pria 6. Dia dinamis dan dia adalah suami yang berbakti, membuat tim yang baik. Mungkin ada saatnya ketika egoisme 1 dapat bertentangan dengan kemurahan hati 6 dan kompromi diperlukan.",
          en: "A balanced and well-adjusted couple who complement the needs of each other. The 1 Man is career minded and a dependable person while the 6 woman is loving, homely and with a sense of responsibility. She is a born hostess and a harmonious home maker who can even forgive the outgoing life of 1 Man.",
          Fr: "Un couple bien équilibré et bien ajusté qui complète les besoins de l'autre. L'homme 1 est axé sur la carrière et la femme 6 est une personne fiable avec un sens des responsabilités. C'est une bonne maîtresse de maison et une femme au foyer harmonieuse qui peut pardonner au futur mari 1. Si la femme est 1, elle a une mission dans la vie et peut être axée sur la carrière ou terre-à-terre. Mais elle se comporte comme une maîtresse de maison, ce qui est l'exigence de l'homme 6. Elle est dynamique et il est un mari dévoué, formant une bonne équipe. Il peut y avoir un moment où l'égoïsme de 1 peut entrer en conflit avec la générosité de 6 et un compromis est nécessaire.",
          es: "Una pareja bien equilibrada y bien ajustada que complementa las necesidades del otro. El hombre 1 está orientado a la carrera y la mujer 6 es una persona confiable con sentido de la responsabilidad. Es una buena anfitriona y una ama de casa armoniosa que puede perdonar al futuro esposo 1. Si la mujer es 1, tiene una misión en la vida y puede estar orientada a la carrera o ser práctica. Pero actúa como una anfitriona, que es el requisito del hombre 6. Ella es dinámica y él es un esposo devoto, formando un buen equipo. Puede haber un momento en que el egoísmo de 1 pueda entrar en conflicto con la generosidad de 6 y se necesite un compromiso.",
          zh: "一个平衡良好、适应良好的伴侣，可以满足彼此的需求。男1是事业心强的，女6是可靠的、有责任感的人。她是一个好女主人和一个和谐的家庭主妇，可以原谅未来的丈夫1。如果女人是1，她一生中有一个使命，可能以事业为导向或脚踏实地。但她表现得像一个女主人，这是男6的要求。她充满活力，他是一个忠诚的丈夫，组成了一个很好的团队。可能有一段时间，1的自私会与6的慷慨发生冲突，需要妥协。",
          hi: "यह रिश्ता अनुशंसित नहीं है क्योंकि उनके व्यक्तित्व परस्पर विरोधी हैं, उनके विचार और राय अलग-अलग हैं और संगतता की संभावना नहीं है। उन्हें एक साथ लाना एक कठिन काम होगा। वे व्यावसायिक मामलों में काफी हद तक सामंजस्यपूर्ण होते हैं क्योंकि 1 की मौलिकता 4 की प्रणाली और व्यवस्था के साथ मिलकर अच्छे परिणाम दे सकती है। व्यक्तिगत जीवन में नंबर 1 सहज और आवेगी होता है जबकि नंबर 4 दिनचर्या, सुव्यवस्था और धीमेपन का आदी होता है। वे आम तौर पर सेक्स के प्रति उदासीन होते हैं। महिला 1 को बहुत सारा उत्साह और रोमांच पसंद है जबकि पुरुष 4 दूसरी तरह का है।",
          ar: "زوجان متوازنان ومتوافقان بشكل جيد يكملان احتياجات بعضهما البعض. الرجل 1 موجه نحو الحياة المهنية والمرأة 6 شخص يمكن الاعتماد عليه مع شعور بالمسؤولية. هي ربة منزل جيدة وربة بيت متناغمة يمكنها أن تسامح الزوج المحتمل رقم 1. إذا كانت المرأة 1، فلديها مهمة في الحياة وقد تكون موجهة نحو الحياة المهنية أو واقعية. لكنها تتصرف كربة منزل وهو مطلب الرجل 6. هي ديناميكية وهو زوج مخلص، مما يجعلهما فريقًا جيدًا. قد يكون هناك وقت تتعارض فيه أنانية الرقم 1 مع كرم الرقم 6 وتكون التسوية ضرورية.",
        },
      },
      "1-7": {
        percentage: 75,
        harmonyPercentage: 7.5,
        explanations: {
          id: "Keduanya menunjukkan hubungan yang harmonis dan kehidupan yang sangat baik. No. 1 adalah pelaku, berorientasi karier, mandiri, dan suportif secara intuitif terhadap 7 yang cerdas, misterius, dan intuitif – mendukung satu sama lain untuk pengembangan lebih lanjut. Karier 1 mendapat akselerasi sementara penelitian dan spesialisasi 7 dipromosikan. Keduanya cenderung melakukan perjalanan untuk spesialisasi baru. Terkadang pencapaian 1 mungkin bertentangan dengan introspeksi 7 tetapi pesona, ketulusan, dan sedikit pengampunan kemungkinan akan menyatukan mereka. Di sisi intim, Pria 1 bergairah dan demonstratif dan tahu bagaimana menyesuaikan diri dengan wanita 7. Dia tidak cemburu dan tahu bagaimana menggunakan imajinasinya dan intuisinya untuk menyesuaikan pasangannya. Di sisi lain, pria 7 menggunakan sifat demonstratif wanita 1. Keduanya mendapatkan kepuasan secara fisik maupun spiritual.",
          en: "The two of them live a harmonious life. No. 1 is a doer, career minded, independent and purposeful fitting very well with No. 7 who is intelligent, mysterious and intuitive—supporting each other for further development. Career of 1 gets acceleration while research and specialisation of 7 is promoted. Both of them like to travel for new experiences. Only at times the attainment of 1 may conflict with the introspections of 7 but the charm, sincerity and a bit of forgiveness is likely to keep them together. On the intimate side the 1 Man is passionate and demonstrative and knows how to adjust with the 7 woman. She is neither jealous nor possessive and can use her imagination and intuition to suit her partner.",
          Fr: "Les deux montrent une relation harmonieuse et une très bonne vie. Le n°1 est un battant, axé sur la carrière, indépendant et intuitif pour soutenir le 7 qui est intelligent, mystérieux et intuitif - se soutenant mutuellement pour un développement ultérieur. La carrière de 1 est accélérée tandis que la recherche et la spécialisation de 7 sont promues. Les deux sont susceptibles de voyager pour de nouvelles spécialisations. Parfois, les réalisations de 1 peuvent entrer en conflit avec l'introspection de 7, mais le charme, la sincérité et un peu de pardon sont susceptibles de les unir. Sur le plan intime, l'homme 1 est passionné et démonstratif et sait s'adapter à la femme 7. Il n'est pas jaloux et sait utiliser son imagination et son intuition pour s'adapter à sa partenaire. D'un autre côté, l'homme 7 utilise la nature démonstrative de la femme 1. Les deux obtiennent une satisfaction physique et spirituelle.",
          es: "Ambos muestran una relación armoniosa y una vida excelente. El Nº 1 es un hacedor, orientado a la carrera, independiente y apoya intuitivamente al 7 que es inteligente, misterioso e intuitivo, apoyándose mutuamente para un mayor desarrollo. La carrera de 1 se acelera mientras que la investigación y especialización de 7 se promueve. Es probable que ambos viajen para nuevas especializaciones. A veces, los logros de 1 pueden entrar en conflicto con la introspección de 7, pero es probable que el encanto, la sinceridad y un poco de perdón los unan. En el lado íntimo, el Hombre 1 es apasionado y demostrativo y sabe cómo adaptarse a la mujer 7. No es celoso y sabe cómo usar su imaginación y su intuición para adaptarse a su pareja. Por otro lado, el hombre 7 utiliza la naturaleza demostrativa de la mujer 1. Ambos obtienen satisfacción tanto física como espiritualmente.",
          zh: "两者都表现出和谐的关系和美好的生活。1号是实干家、事业心强、独立，并且直觉上支持聪明、神秘和直觉的7——互相支持以求进一步发展。1的事业得到加速，而7的研究和专业化得到促进。两人都倾向于为新的专业化而出差。有时1的成就可能与7的内省发生冲突，但魅力、真诚和一点点的宽恕很可能会将他们团结在一起。在亲密方面，男1热情、表现力强，知道如何适应女7。他不嫉妒，知道如何运用他的想象力和直觉来适应他的伴侣。另一方面，男7利用女1的表现力。两人在身体和精神上都得到满足。",
          hi: "यह रिश्ता अनुशंसित नहीं है क्योंकि उनके व्यक्तित्व परस्पर विरोधी हैं, उनके विचार और राय अलग-अलग हैं और संगतता की संभावना नहीं है। उन्हें एक साथ लाना एक कठिन काम होगा। वे व्यावसायिक मामलों में काफी हद तक सामंजस्यपूर्ण होते हैं क्योंकि 1 की मौलिकता 4 की प्रणाली और व्यवस्था के साथ मिलकर अच्छे परिणाम दे सकती है। व्यक्तिगत जीवन में नंबर 1 सहज और आवेगी होता है जबकि नंबर 4 दिनचर्या, सुव्यवस्था और धीमेपन का आदी होता है। वे आम तौर पर सेक्स के प्रति उदासीन होते हैं। महिला 1 को बहुत सारा उत्साह और रोमांच पसंद है जबकि पुरुष 4 दूसरी तरह का है।",
          ar: "يُظهر كلاهما علاقة متناغمة وحياة ممتازة. الرقم 1 هو فاعل، موجه نحو الحياة المهنية، مستقل، وداعم بشكل حدسي للرقم 7 الذكي، الغامض، والحدسي – يدعمان بعضهما البعض لمزيد من التطوير. تتسارع مسيرة الرقم 1 المهنية بينما يتم تعزيز أبحاث وتخصصات الرقم 7. يميل كلاهما إلى السفر من أجل تخصصات جديدة. في بعض الأحيان قد يتعارض إنجاز الرقم 1 مع استبطان الرقم 7 ولكن السحر والإخلاص والقليل من التسامح من المرجح أن يجمعهما. على الجانب الحميمي، الرجل 1 عاطفي واستعراضي ويعرف كيف يتكيف مع المرأة 7. هو ليس غيورًا ويعرف كيف يستخدم خياله وحدسه للتكيف مع شريكته. من ناحية أخرى، يستفيد الرجل 7 من الطبيعة الاستعراضية للمرأة 1. كلاهما يحصلان على الرضا جسديًا وروحيًا.",
        },
      },
      "1-8": {
        percentage: 50,
        harmonyPercentage: 5,
        explanations: {
          id: "Ini adalah hubungan cinta/benci di mana kedua pasangan adalah karakter yang kuat, tangguh, dan kaku. Mereka akan selalu berusaha saling mengalahkan kecuali mereka dapat mengendalikan sifat-sifat paksa mereka. Keduanya terlalu bangga untuk saling meminta maaf. Jika No. 1 memutuskan untuk menggunakan pesona dan pengampunan dan No. 8 memutuskan untuk mengekang kecemburuan dan meredakan emosi, mereka dapat bekerja sama secara kooperatif, hubungannya dapat menjadi bencana yang sehat. Jika tidak, kemungkinan akan berakhir dalam perpisahan atau perceraian yang tidak dapat dihindari. Pria 1 adalah kekasih yang bergairah dan jika wanita 8 tidak siap, pria 1 tidak dapat memaksanya. Di sisi lain jika pria 8 dan wanita 1 adalah dia akan menemukan waktu yang tepat untuk berhubungan. Wanita 8 harus ingat bahwa pria 1 dapat menemukan pasangan lain jika cinta ditolak.",
          en: "This is a love/hate relationship in which both the partners are strong, tough and rigid characters. They will always try to outdo each other unless they can control their forceful dispositions. Both are too proud to apologize to each other. If No. 1 decides to use charm and forgiveness and No. 8 decides to curb jealousy and temper the emotions they can work together co-operatively, the relationship can be a healthy disaster. Otherwise it is likely to end up in unavoidable separation or divorce. The 1 Man is a passionate lover and if the 8 woman is not ready, the 1 man cannot force her.",
          Fr: "C'est une relation d'amour/haine où les deux partenaires sont des personnages forts, durs et rigides. Ils essaieront toujours de se surpasser à moins qu'ils ne puissent contrôler leurs traits de caractère coercitifs. Les deux sont trop fiers pour s'excuser l'un auprès de l'autre. Si le n°1 décide d'utiliser le charme et le pardon et que le n°8 décide de freiner la jalousie et d'apaiser les émotions, ils peuvent travailler ensemble de manière coopérative, la relation peut devenir un désastre sain. Sinon, il est probable que cela se termine par une séparation ou un divorce inévitable. L'homme 1 est un amant passionné et si la femme 8 n'est pas prête, l'homme 1 ne peut pas la forcer. D'un autre côté, si l'homme est 8 et la femme 1, il trouvera le bon moment pour avoir des relations. La femme 8 doit se rappeler que l'homme 1 peut trouver un autre partenaire si l'amour est refusé.",
          es: "Esta es una relación de amor/odio en la que ambos miembros de la pareja son personajes fuertes, duros y rígidos. Siempre intentarán superarse el uno al otro a menos que puedan controlar sus rasgos coercitivos. Ambos son demasiado orgullosos para pedirse perdón. Si el Nº 1 decide usar el encanto y el perdón y el Nº 8 decide frenar los celos y aliviar las emociones, pueden trabajar juntos en cooperación, la relación puede convertirse en un desastre saludable. De lo contrario, es probable que termine en una separación o divorcio inevitable. El hombre 1 es un amante apasionado y si la mujer 8 no está lista, el hombre 1 no puede forzarla. Por otro lado, si el hombre es 8 y la mujer 1, encontrará el momento adecuado para tener relaciones. La mujer 8 debe recordar que el hombre 1 puede encontrar otra pareja si se le niega el amor.",
          zh: "这是一种爱恨交织的关系，双方都是坚强、强硬和僵硬的角色。除非他们能够控制自己强迫性的特质，否则他们总是会试图超越对方。两人都太骄傲，不肯互相道歉。如果1号决定使用魅力和宽恕，而8号决定抑制嫉妒和缓和情绪，他们可以合作，关系可能会成为一场健康的灾难。否则，很可能会以不可避免的分离或离婚告终。男1是一个热情的爱人，如果女8还没准备好，男1不能强迫她。另一方面，如果男人是8，女人是1，他会找到合适的时间发生关系。女8必须记住，如果爱情被拒绝，男1可以找到另一个伴侣。",
          hi: "वे दोनों लंबे समय तक साथ नहीं रह सकते। नंबर 1 दृढ़, स्थिर और करियर उन्मुख है जबकि नंबर 5 बहुमुखी, परिवर्तनशील और सेक्सी है। रिश्ता और भी बदतर हो जाता है जब पुरुष 1 होता है और महिला 5 होती है। महिला 5 जीवन में जल्दी शादी नहीं करती जब तक कि उसका विवाह पूर्व संबंध न हो। वे दोनों आक्रामक हैं और स्थिति अक्सर भड़कने की संभावना है। उनके लिए समझौता करना मुश्किल है। यह केवल निजी जीवन है जो उन्हें एक साथ रख सकता है यदि वे अन्य मुद्दों पर समझौता कर सकते हैं। पुरुष 1 मजबूत, प्रदर्शनकारी और साहसी है जबकि महिला 5 सेक्स के मामलों में समायोजन कर सकती है। इसलिए दोनों एक-दूसरे के अनुकूल हो सकते हैं। यदि पुरुष 5 है तो वह सेक्स के लिए अधिक प्रवृत्त होता है लेकिन महिला 1 भी समायोजन कर सकती है और दोनों एक अच्छा जोड़ा बना सकते हैं।",
          ar: "هذه علاقة حب/كره حيث يكون كلا الشريكين شخصيتين قويتين وصارمتين. سيحاولان دائمًا التغلب على بعضهما البعض ما لم يتمكنا من التحكم في صفاتهما القسرية. كلاهما فخوران جدًا بحيث لا يعتذران لبعضهما البعض. إذا قرر الرقم 1 استخدام السحر والتسامح وقرر الرقم 8 كبح الغيرة وتخفيف المشاعر، فيمكنهما العمل معًا بشكل تعاوني، ويمكن أن تكون العلاقة كارثة صحية. وإلا، فمن المرجح أن تنتهي بانفصال أو طلاق لا مفر منه. الرجل 1 حبيب عاطفي وإذا لم تكن المرأة 8 مستعدة، فلا يمكن للرجل 1 إجبارها. من ناحية أخرى إذا كان الرجل 8 والمرأة 1، فسيجد الوقت المناسب للتواصل. يجب أن تتذكر المرأة 8 أن الرجل 1 يمكن أن يجد شريكًا آخر إذا تم رفض الحب.",
        },
      },
      "1-9": {
        percentage: 75,
        harmonyPercentage: 7.5,
        explanations: {
          id: "Kombinasi tersebut menghasilkan hubungan yang sukses karena sifat-sifat kedua orang saling melengkapi. No. 1 adalah orang yang kuat, dominan, dan berorientasi karier sementara No. 9 simpatik, filantropis, dan penuh kasih sayang. Persahabatan itu ideal jika Pria adalah 1 dan Wanita adalah 9 karena bahkan dalam ketidaksepakatan dia berkompromi dengan tingkat kepastian tertentu. Dia tidak egois dan teman yang setia dengan tidak ada kecerdasan yang lebih tinggi dari pasangannya. Dia akan selalu mendorong ambisi pasangannya. Namun, keegoisan 1 dapat bertentangan dengan filantropi 9 dan cek lebih lanjut akan diperlukan. Ketika Pria 9 temperamennya cepat dan impulsifitasnya membuat dia negatif, dan ini harus dikendalikan. Keduanya sama-sama cerdas dan cakap, Pria 9 ingin tetap menjadi bos rumah sementara wanita 1 mungkin berpikir dia adalah kepala. Namun, perbedaan ini tidak begitu serius karena kasih sayang dan pengampunan dari wanita 1 dan akal sehat dapat dengan mudah menyelesaikannya. Dalam hubungan perkawinan, agresivitas sensual wanita 1 sangat cocok dengan gairah dan ketundukan wanita 9. Jika pria adalah 9, dia sangat bergairah dan inventif serta demonstratif, wanita 1 akan mencocokkannya dengan sempurna.",
          en: "The combination produce a successful relationship since the natures of the two persons complement each other. No 1 is forceful, dominant and career minded while No 9 is sympathetic, philanthropic and compassionate. The companionship is ideal if the Male is 1 and the Female is 9 because even in disagreement she compromises with a certain degree of humour. She is an unselfish and loyal companion with no less intelligence than his. She will always encourage the ambition of her partner. However, the selfishness of 1 can conflict with philanthropy of 9 and a check here would be necessary. When the Man is 9 his quick temperament and impulsiveness makes him negative, and this should be controlled. Although both are equally intelligent and capable, the 9 Man would like to remain the boss of the home while 1 woman may think that she is head. However, this difference is not so serious since the affection and forgiveness of 1 Woman and some faith and common sense can easily work it out. ",
          Fr: "La combinaison aboutit à une relation réussie car les traits des deux personnes se complètent. Le n°1 est une personne forte, dominante et axée sur la carrière tandis que le n°9 est sympathique, philanthrope et affectueux. L'amitié est idéale si l'homme est 1 et la femme est 9 car même en cas de désaccord, elle fait des compromis avec un certain degré de certitude. Elle est désintéressée et une amie fidèle sans intelligence supérieure à son partenaire. Elle encouragera toujours les ambitions de son partenaire. Cependant, l'égoïsme de 1 peut entrer en conflit avec la philanthropie de 9 et un contrôle supplémentaire sera nécessaire. Lorsque l'homme est 9, son tempérament vif et son impulsivité le rendent négatif, et cela doit être contrôlé. Les deux sont également intelligents et capables, l'homme 9 veut rester le patron de la maison tandis que la femme 1 peut penser qu'elle est le chef. Cependant, ces différences ne sont pas si graves car l'affection et le pardon de la femme 1 et le bon sens peuvent facilement les résoudre. Dans la relation conjugale, l'agressivité sensuelle de la femme 1 correspond parfaitement à la passion et à la soumission de la femme 9. Si l'homme est 9, il est très passionné, inventif et démonstratif, la femme 1 lui correspondra parfaitement.",
          es: "La combinación da como resultado una relación exitosa porque los rasgos de ambas personas se complementan. El Nº 1 es una persona fuerte, dominante y orientada a la carrera, mientras que el Nº 9 es comprensivo, filantrópico y afectuoso. La amistad es ideal si el Hombre es 1 y la Mujer es 9 porque incluso en el desacuerdo, ella se compromete con un cierto grado de certeza. Es desinteresada y una amiga leal sin mayor inteligencia que su pareja. Siempre fomentará las ambiciones de su pareja. Sin embargo, el egoísmo de 1 puede entrar en conflicto con la filantropía de 9 y se necesitará un mayor control. Cuando el Hombre es 9, su temperamento rápido y su impulsividad lo vuelven negativo, y esto debe controlarse. Ambos son igualmente inteligentes y capaces, el Hombre 9 quiere seguir siendo el jefe de la casa mientras que la mujer 1 puede pensar que ella es la cabeza. Sin embargo, estas diferencias no son tan graves porque el afecto y el perdón de la mujer 1 y el sentido común pueden resolverlas fácilmente. En la relación matrimonial, la agresividad sensual de la mujer 1 encaja perfectamente con la pasión y la sumisión de la mujer 9. Si el hombre es 9, es muy apasionado, inventivo y demostrativo, la mujer 1 lo igualará perfectamente.",
          zh: "这种组合会产生成功的关系，因为两个人的特质是互补的。1号是一个坚强、占主导地位和事业心强的人，而9号是富有同情心、慈善和充满爱心的人。如果男人是1，女人是9，友谊是理想的，因为即使在分歧中，她也会在一定程度上妥协。她无私，是一个忠实的朋友，智力不高于她的伴侣。她总是会鼓励伴侣的雄心。然而，1的自私可能会与9的慈善事业发生冲突，需要进一步的检查。当男人是9时，他的脾气暴躁和冲动使他变得消极，这必须得到控制。两人同样聪明能干，男9希望继续当家作主，而女1可能认为自己是头。然而，这些差异并不那么严重，因为女1的爱和宽恕以及常识可以很容易地解决它们。在婚姻关系中，女1的感官攻击性与女9的热情和顺从完美匹配。如果男人是9，他非常热情、富有创造力和表现力，女1会与他完美匹配。",
          hi: "एक संतुलित और अच्छी तरह से समायोजित जोड़ा जो एक-दूसरे की जरूरतों को पूरा करता है। पुरुष 1 करियर उन्मुख और एक भरोसेमंद व्यक्ति है जबकि महिला 6 प्यार करने वाली, घरेलू और जिम्मेदारी की भावना वाली है। वह एक जन्मजात परिचारिका और एक सामंजस्यपूर्ण घर बनाने वाली है जो पुरुष 1 के बहिर्मुखी जीवन को भी माफ कर सकती है।",
          ar: "ينتج عن هذا المزيج علاقة ناجحة لأن صفات كلا الشخصين تكمل بعضها البعض. الرقم 1 شخص قوي، مهيمن، وموجه نحو الحياة المهنية بينما الرقم 9 متعاطف، محب للخير، وعطوف. الصداقة مثالية إذا كان الرجل هو 1 والمرأة هي 9 لأنه حتى في الخلافات تتنازل بدرجة معينة من اليقين. هي ليست أنانية وصديقة مخلصة وليس لديها ذكاء أعلى من شريكها. ستشجع دائمًا طموحات شريكها. ومع ذلك، يمكن أن تتعارض أنانية الرقم 1 مع حب الخير لدى الرقم 9 وستكون هناك حاجة إلى مزيد من الضوابط. عندما يكون الرجل 9، يكون مزاجه سريعًا واندفاعه يجعله سلبيًا، ويجب التحكم في ذلك. كلاهما ذكيان وقادران على حد سواء، ويريد الرجل 9 أن يبقى رئيس المنزل بينما قد تعتقد المرأة 1 أنها هي الرئيسة. ومع ذلك، فإن هذه الاختلافات ليست خطيرة جدًا لأن عطف وتسامح المرأة 1 والحس السليم يمكن أن يحلاها بسهولة. في العلاقة الزوجية، تتوافق العدوانية الحسية للمرأة 1 تمامًا مع شغف وخضوع المرأة 9. إذا كان الرجل هو 9، فهو عاطفي للغاية ومبدع واستعراضي، وستطابقه المرأة 1 تمامًا.",
        },
      },
    };

    // Create symmetric entries (2-1 same as 1-2, etc.)
    const key1 = `${time1}-${time2}`;
    const key2 = `${time2}-${time1}`;

    const matchData = matchTable[key1] || matchTable[key2];

    if (matchData) {
      const currentLanguage = language as keyof typeof matchData.explanations;
      const explanation =
        matchData.explanations[currentLanguage] || matchData.explanations.en;

      return {
        percentage: matchData.percentage,
        explanation: explanation,
      };
    }

    return {
      percentage: 50,
      explanation:
        language === "id"
          ? "Kombinasi ini memerlukan analisis lebih lanjut untuk menentukan tingkat kompatibilitas yang tepat."
          : "This combination requires further analysis to determine the exact compatibility level.",
    };
  };

  // Get harmony percentage based on parameter combinations
  const getHarmonyPercentage = (param1: number, param2: number): number => {
    const harmonyTable: Record<string, number> = {
      "1-1": 5,
      "1-2": 7.5,
      "1-11": 7.5,
      "1-3": 7.5,
      "1-4": 2.5,
      "1-22": 2.5,
      "1-5": 2.5,
      "1-6": 7.5,
      "1-33": 7.5,
      "1-7": 7.5,
      "1-8": 5,
      "1-9": 7.5,
      "2-1": 7.5,
      "2-2": 10,
      "2-11": 10,
      "2-3": 5,
      "2-4": 7.5,
      "2-22": 7.5,
      "2-5": 2.5,
      "2-6": 10,
      "2-33": 10,
      "2-7": 7.5,
      "2-8": 5,
      "2-9": 10,
      "3-1": 7.5,
      "3-2": 5,
      "3-11": 5,
      "3-3": 2.5,
      "3-4": 5,
      "3-22": 5,
      "3-5": 7.5,
      "3-6": 10,
      "3-33": 10,
      "3-7": 5,
      "3-8": 2.5,
      "3-9": 10,
      "4-1": 2.5,
      "4-2": 7.5,
      "4-11": 7.5,
      "4-3": 5,
      "4-4": 10,
      "4-22": 10,
      "4-5": 5,
      "4-6": 10,
      "4-33": 10,
      "4-7": 7.5,
      "4-8": 7.5,
      "4-9": 7.5,
      "5-1": 2.5,
      "5-2": 2.5,
      "5-11": 2.5,
      "5-3": 7.5,
      "5-4": 5,
      "5-22": 5,
      "5-5": 2.5,
      "5-6": 5,
      "5-7": 5,
      "5-8": 5,
      "5-9": 5,
      "6-1": 7.5,
      "33-1": 7.5,
      "6-2": 10,
      "33-2": 7.5,
      "6-11": 10,
      "33-11": 10,
      "6-3": 10,
      "33-3": 10,
      "6-4": 10,
      "33-4": 10,
      "6-22": 10,
      "33-22": 10,
      "6-5": 5,
      "33-5": 5,
      "6-6": 10,
      "33-33": 10,
      "6-7": 5,
      "33-7": 5,
      "6-8": 5,
      "33-8": 5,
      "6-9": 10,
      "33-9": 10,
      "7-1": 7.5,
      "7-2": 7.5,
      "7-11": 7.5,
      "7-3": 5,
      "7-4": 7.5,
      "7-22": 7.5,
      "7-5": 5,
      "7-6": 5,
      "7-7": 10,
      "7-8": 5,
      "7-9": 10,
      "8-1": 5,
      "8-2": 5,
      "8-11": 5,
      "8-3": 2.5,
      "8-4": 7.5,
      "8-22": 7.5,
      "8-5": 5,
      "8-6": 7.5,
      "8-33": 7.5,
      "8-7": 5,
      "8-8": 5,
      "8-9": 7.5,
      "9-1": 7.5,
      "9-2": 10,
      "9-11": 10,
      "9-3": 10,
      "9-4": 7.5,
      "9-22": 7.5,
      "9-5": 5,
      "9-6": 10,
      "9-33": 10,
      "9-7": 10,
      "9-8": 7.5,
      "9-9": 10,
      "11-1": 7.5,
      "11-2": 10,
      "11-11": 10,
      "11-3": 5,
      "11-4": 7.5,
      "11-22": 7.5,
      "11-5": 2.5,
      "11-6": 10,
      "11-33": 10,
      "11-7": 7.5,
      "11-8": 5,
      "11-9": 10,
      "22-1": 2.5,
      "22-2": 7.5,
      "22-11": 7.5,
      "22-3": 5,
      "22-4": 10,
      "22-22": 10,
      "22-5": 5,
      "22-6": 10,
      "22-7": 7.5,
      "22-8": 7.5,
      "22-9": 7.5,
    };

    const key1 = `${param1}-${param2}`;
    const key2 = `${param2}-${param1}`;

    return harmonyTable[key1] || harmonyTable[key2] || 5.0;
  };

  // Get minor harmony percentage for specific parameters (Birth, Ultimate, Habit, Plan of Expression, Point of Intensification)
  const getMinorHarmonyPercentage = (
    param1: number,
    param2: number,
  ): number => {
    const minorHarmonyTable: Record<string, number> = {
      "1-1": 0.01,
      "1-2": 0.015,
      "1-11": 0.015,
      "1-3": 0.015,
      "1-4": 0.005,
      "1-22": 0.005,
      "1-5": 0.005,
      "1-6": 0.015,
      "1-7": 0.015,
      "1-8": 0.01,
      "1-9": 0.015,
      "2-1": 0.015,
      "2-2": 0.02,
      "2-11": 0.02,
      "2-3": 0.01,
      "2-4": 0.015,
      "2-22": 0.015,
      "2-5": 0.005,
      "2-6": 0.02,
      "2-7": 0.015,
      "2-8": 0.01,
      "2-9": 0.02,
      "3-1": 0.015,
      "3-2": 0.01,
      "3-11": 0.01,
      "3-3": 0.005,
      "3-4": 0.01,
      "3-22": 0.01,
      "3-5": 0.015,
      "3-6": 0.02,
      "3-7": 0.01,
      "3-8": 0.005,
      "3-9": 0.02,
      "4-1": 0.005,
      "4-2": 0.015,
      "4-11": 0.015,
      "4-3": 0.01,
      "4-4": 0.02,
      "4-22": 0.02,
      "4-5": 0.01,
      "4-6": 0.02,
      "4-7": 0.015,
      "4-8": 0.015,
      "4-9": 0.015,
      "5-1": 0.005,
      "5-2": 0.005,
      "5-11": 0.005,
      "5-3": 0.015,
      "5-4": 0.01,
      "5-22": 0.01,
      "5-5": 0.005,
      "5-6": 0.01,
      "5-7": 0.01,
      "5-8": 0.01,
      "5-9": 0.01,
      "6-1": 0.015,
      "6-2": 0.02,
      "6-11": 0.02,
      "6-3": 0.02,
      "6-4": 0.02,
      "6-22": 0.02,
      "6-5": 0.01,
      "6-6": 0.02,
      "6-7": 0.01,
      "6-8": 0.01,
      "6-9": 0.02,
      "7-1": 0.015,
      "7-2": 0.015,
      "7-11": 0.015,
      "7-3": 0.01,
      "7-4": 0.015,
      "7-22": 0.015,
      "7-5": 0.01,
      "7-6": 0.01,
      "7-7": 0.02,
      "7-8": 0.01,
      "7-9": 0.02,
      "8-1": 0.01,
      "8-2": 0.01,
      "8-11": 0.01,
      "8-3": 0.005,
      "8-4": 0.015,
      "8-22": 0.015,
      "8-5": 0.01,
      "8-6": 0.015,
      "8-7": 0.01,
      "8-8": 0.01,
      "8-9": 0.015,
      "9-1": 0.015,
      "9-2": 0.02,
      "9-11": 0.02,
      "9-3": 0.02,
      "9-4": 0.015,
      "9-22": 0.015,
      "9-5": 0.01,
      "9-6": 0.02,
      "9-7": 0.02,
      "9-8": 0.015,
      "9-9": 0.02,
      "11-1": 0.015,
      "11-2": 0.02,
      "11-11": 0.02,
      "11-3": 0.01,
      "11-4": 0.015,
      "11-22": 0.015,
      "11-5": 0.005,
      "11-6": 0.02,
      "11-7": 0.015,
      "11-8": 0.01,
      "11-9": 0.02,
      "22-1": 0.005,
      "22-2": 0.015,
      "22-11": 0.015,
      "22-3": 0.01,
      "22-4": 0.02,
      "22-22": 0.02,
      "22-5": 0.01,
      "22-6": 0.02,
      "22-7": 0.015,
      "22-8": 0.015,
      "22-9": 0.015,
    };

    const key1 = `${param1}-${param2}`;
    const key2 = `${param2}-${param1}`;

    return minorHarmonyTable[key1] || minorHarmonyTable[key2] || 0.1;
  };

  // Calculate total harmony value
  const calculateHarmony = (
    person1: {
      expression: number;
      time: number;
      heart: number;
      birth: number;
      ultimate: number;
      habit: number;
      planOfExpression: number;
      pointOfIntensification: number;
    },
    person2: {
      expression: number;
      time: number;
      heart: number;
      birth: number;
      ultimate: number;
      habit: number;
      planOfExpression: number;
      pointOfIntensification: number;
    },
  ): number => {
    let totalHarmony = 0;

    // 14 parameter combinations as specified
    totalHarmony += getHarmonyPercentage(
      person1.expression,
      person2.expression,
    );
    totalHarmony += getHarmonyPercentage(person1.expression, person2.time);
    totalHarmony += getHarmonyPercentage(person1.expression, person2.heart);
    totalHarmony += getHarmonyPercentage(person1.time, person2.time);
    totalHarmony += getHarmonyPercentage(person1.time, person2.expression);
    totalHarmony += getHarmonyPercentage(person1.time, person2.heart);
    totalHarmony += getHarmonyPercentage(person1.heart, person2.time);
    totalHarmony += getHarmonyPercentage(person1.heart, person2.expression);
    totalHarmony += getHarmonyPercentage(person1.heart, person2.heart);

    // Use minor values for specific parameters
    totalHarmony +=
      getMinorHarmonyPercentage(person1.birth, person2.birth) * 100;
    totalHarmony +=
      getMinorHarmonyPercentage(person1.ultimate, person2.ultimate) * 100;
    totalHarmony +=
      getMinorHarmonyPercentage(person1.habit, person2.habit) * 100;
    totalHarmony +=
      getMinorHarmonyPercentage(
        person1.planOfExpression,
        person2.planOfExpression,
      ) * 100;
    totalHarmony +=
      getMinorHarmonyPercentage(
        person1.pointOfIntensification,
        person2.pointOfIntensification,
      ) * 100;

    return Math.round(totalHarmony * 100) / 100; // Round to 2 decimal places
  };

  const handleCheck = () => {
    if (name1.trim() && name2.trim()) {
      const compatibility = checkCompatibility(
        name1,
        birthdate1,
        name2,
        birthdate2,
      );
      setResults(compatibility);

      // Calculate expression, time, and heart for both persons
      const person1Expression = calculateExpression(name1);
      const person1Time = calculateTime(birthdate1);
      const person1Heart = calculateHeart(name1);
      const person1Birth = calculateBirth(birthdate1);
      const person1Ultimate = calculateUltimate(person1Time, person1Expression);
      const person1Name = calculateName(name1);
      const person1Habit = calculateHabit(name1);
      const person1PlanOfExpression = calculatePlanOfExpression(
        name1,
        birthdate1,
      );
      const person1PointOfIntensification =
        calculatePointOfIntensification(name1);

      const person2Expression = calculateExpression(name2);
      const person2Time = calculateTime(birthdate2);
      const person2Heart = calculateHeart(name2);
      const person2Birth = calculateBirth(birthdate2);
      const person2Ultimate = calculateUltimate(person2Time, person2Expression);
      const person2Name = calculateName(name2);
      const person2Habit = calculateHabit(name2);
      const person2PlanOfExpression = calculatePlanOfExpression(
        name2,
        birthdate2,
      );
      const person2PointOfIntensification =
        calculatePointOfIntensification(name2);

      // Calculate match based on Time values
      const matchData = getMatchData(person1Time, person2Time);

      // Calculate harmony value
      const person1Data = {
        expression: person1Expression,
        time: person1Time,
        heart: person1Heart,
        birth: person1Birth,
        ultimate: person1Ultimate,
        habit: person1Habit,
        planOfExpression: person1PlanOfExpression,
        pointOfIntensification: person1PointOfIntensification,
      };

      const person2Data = {
        expression: person2Expression,
        time: person2Time,
        heart: person2Heart,
        birth: person2Birth,
        ultimate: person2Ultimate,
        habit: person2Habit,
        planOfExpression: person2PlanOfExpression,
        pointOfIntensification: person2PointOfIntensification,
      };

      const harmonyValue = calculateHarmony(person1Data, person2Data);

      setCalculatedResults({
        person1: person1Data,
        person2: person2Data,
        match: matchData,
        harmony: harmonyValue,
      });
    }
  };

  const renderCompatibilityMeter = (score: number) => {
    return (
      <View className="items-center my-4">
        <View className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <View
            className={`h-full ${score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : score >= 40 ? "bg-orange-500" : "bg-red-500"}`}
            style={{ width: `${score}%` }}
          />
        </View>
        <Text className="text-3xl font-bold mt-2">{score}%</Text>
      </View>
    );
  };

  const renderAreaScore = (name: string, score: number) => {
    return (
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-700 capitalize">{name}</Text>
        <View className="flex-row items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <View
              key={i}
              className={`w-3 h-3 rounded-full mx-0.5 ${i <= score ? "bg-purple-600" : "bg-gray-200"}`}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderDatePickerModal = (personNumber: 1 | 2) => {
    const isVisible = personNumber === 1 ? showDatePicker1 : showDatePicker2;
    const selectedDay = personNumber === 1 ? selectedDay1 : selectedDay2;
    const selectedMonth = personNumber === 1 ? selectedMonth1 : selectedMonth2;
    const selectedYear = personNumber === 1 ? selectedYear1 : selectedYear2;
    const setVisible =
      personNumber === 1 ? setShowDatePicker1 : setShowDatePicker2;
    const handleDateChange =
      personNumber === 1 ? handleDateChange1 : handleDateChange2;
    const setSelectedDay =
      personNumber === 1 ? setSelectedDay1 : setSelectedDay2;
    const setSelectedMonth =
      personNumber === 1 ? setSelectedMonth1 : setSelectedMonth2;
    const setSelectedYear =
      personNumber === 1 ? setSelectedYear1 : setSelectedYear2;

    return (
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-96 max-w-full max-h-[90%]">
            <Text className="text-lg font-bold text-center mb-4 text-purple-800">
              {t("select_birth_date")}
            </Text>

            {/* Year and Month Dropdowns */}
            <View className="flex-row justify-between mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-gray-700 mb-1 font-medium text-sm">
                  {t("year")}
                </Text>
                <View className="border border-gray-300 rounded-md bg-gray-50">
                  <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => {
                      setSelectedYear(itemValue);
                      handleDateChange(selectedDay, selectedMonth, itemValue);
                    }}
                    style={{ height: 40 }}
                  >
                    {generateYears().map((year) => (
                      <Picker.Item
                        key={year}
                        label={year.toString()}
                        value={year}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View className="flex-1 ml-2">
                <Text className="text-gray-700 mb-1 font-medium text-sm">
                  {t("month")}
                </Text>
                <View className="border border-gray-300 rounded-md bg-gray-50">
                  <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => {
                      setSelectedMonth(itemValue);
                      handleDateChange(selectedDay, itemValue, selectedYear);
                    }}
                    style={{ height: 40 }}
                  >
                    {months.map((month) => (
                      <Picker.Item
                        key={month.value}
                        label={month.label}
                        value={month.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            {/* Calendar Grid */}
            <ScrollView className="mb-4" style={{ maxHeight: 300 }}>
              <Text className="text-center font-semibold mb-3 text-purple-700">
                {months.find((m) => m.value === selectedMonth)?.label}{" "}
                {selectedYear}
              </Text>

              {/* Days of Week Header */}
              <View className="flex-row mb-2">
                {[
                  t("sun") || "Sun",
                  t("mon") || "Mon",
                  t("tue") || "Tue",
                  t("wed") || "Wed",
                  t("thu") || "Thu",
                  t("fri") || "Fri",
                  t("sat") || "Sat",
                ].map((day) => (
                  <View key={day} className="flex-1 p-2 bg-purple-100">
                    <Text className="text-purple-800 text-center font-semibold text-xs">
                      {day}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Calendar Days Grid */}
              <View className="border border-gray-300">
                {(() => {
                  const firstDayOfMonth = new Date(
                    selectedYear,
                    selectedMonth - 1,
                    1,
                  ).getDay();
                  const daysInMonth = new Date(
                    selectedYear,
                    selectedMonth,
                    0,
                  ).getDate();
                  const totalCells =
                    Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
                  const calendarGrid = [];

                  // Add empty cells for days before the first day of the month
                  for (let i = 0; i < firstDayOfMonth; i++) {
                    calendarGrid.push(null);
                  }

                  // Add days of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    calendarGrid.push(day);
                  }

                  // Add empty cells to complete the grid
                  while (calendarGrid.length < totalCells) {
                    calendarGrid.push(null);
                  }

                  return Array.from(
                    { length: Math.ceil(calendarGrid.length / 7) },
                    (_, weekIndex) => (
                      <View key={weekIndex} className="flex-row">
                        {calendarGrid
                          .slice(weekIndex * 7, (weekIndex + 1) * 7)
                          .map((day, dayIndex) => (
                            <TouchableOpacity
                              key={`${weekIndex}-${dayIndex}`}
                              className={`flex-1 border border-gray-200 min-h-[40px] justify-center items-center ${
                                day ? "bg-white" : "bg-gray-50"
                              } ${
                                day === selectedDay
                                  ? "bg-purple-700 shadow-lg border-purple-800"
                                  : ""
                              }`}
                              disabled={!day}
                              onPress={() => {
                                if (day) {
                                  setSelectedDay(day);
                                  handleDateChange(
                                    day,
                                    selectedMonth,
                                    selectedYear,
                                  );
                                }
                              }}
                            >
                              {day && (
                                <Text
                                  className={`text-sm font-bold ${
                                    day === selectedDay
                                      ? "text-white shadow-sm"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {day}
                                </Text>
                              )}
                            </TouchableOpacity>
                          ))}
                      </View>
                    ),
                  );
                })()}
              </View>
            </ScrollView>

            {/* Selected Date Display */}
            <View className="mb-4 p-3 bg-purple-50 rounded-lg">
              <Text className="text-center text-purple-800 font-semibold">
                {t("selected_date") || "Selected Date"}: {selectedDay}/
                {selectedMonth}/{selectedYear}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-gray-300 py-2 px-4 rounded-md flex-1 mr-2"
                onPress={() => setVisible(false)}
              >
                <Text className="text-gray-700 text-center font-medium">
                  {t("cancel")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-purple-600 py-2 px-4 rounded-md flex-1 ml-2"
                onPress={() => setVisible(false)}
              >
                <Text className="text-white text-center font-medium">
                  {t("done")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView className="bg-white p-4 rounded-lg shadow-md">
      <Text className="text-2xl font-bold text-center mb-6 text-purple-800">
        {t("compatibility_checker")}
      </Text>

      <View className="mb-6 p-4 bg-purple-50 rounded-lg">
        <Text className="text-lg font-semibold mb-2 text-purple-800">
          {t("person_1")}
        </Text>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1 font-medium">
            {t("full_name")}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 bg-white"
            placeholder={t("enter_full_name")}
            value={name1}
            onChangeText={handleNameChange1}
          />
          {normalizedName1 ? (
            <Text className="text-xs text-gray-500 mt-1">
              {t("normalized")}: {normalizedName1}
            </Text>
          ) : null}
        </View>

        <View className="mb-2">
          <Text className="text-gray-700 mb-1 font-medium">
            {t("birth_date")}
          </Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-md p-3 bg-white flex-row justify-between items-center"
            onPress={() => setShowDatePicker1(true)}
          >
            <Text className="text-gray-700">
              {selectedDay1}/{selectedMonth1}/{selectedYear1}
            </Text>
            <Text className="text-gray-400">📅</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-6 p-4 bg-blue-50 rounded-lg">
        <Text className="text-lg font-semibold mb-2 text-blue-800">
          {t("person_2")}
        </Text>

        <View className="mb-4">
          <Text className="text-gray-700 mb-1 font-medium">
            {t("full_name")}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 bg-white"
            placeholder={t("enter_full_name")}
            value={name2}
            onChangeText={handleNameChange2}
          />
          {normalizedName2 ? (
            <Text className="text-xs text-gray-500 mt-1">
              {t("normalized")}: {normalizedName2}
            </Text>
          ) : null}
        </View>

        <View className="mb-2">
          <Text className="text-gray-700 mb-1 font-medium">
            {t("birth_date")}
          </Text>
          <TouchableOpacity
            className="border border-gray-300 rounded-md p-3 bg-white flex-row justify-between items-center"
            onPress={() => setShowDatePicker2(true)}
          >
            <Text className="text-gray-700">
              {selectedDay2}/{selectedMonth2}/{selectedYear2}
            </Text>
            <Text className="text-gray-400">📅</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="bg-purple-600 py-3 px-4 rounded-md items-center mb-6"
        onPress={handleCheck}
      >
        <Text className="text-white font-medium text-lg">
          {t("check_compatibility")}
        </Text>
      </TouchableOpacity>

      {calculatedResults && (
        <View className="p-4 bg-gray-50 rounded-lg mb-6">
          <Text className="text-xl font-bold text-center mb-4 text-purple-800">
            Analisis Numerologi
          </Text>

          {/* Parameters Table */}
          <View className="bg-white rounded-lg p-4 mb-4">
            <View className="flex-row border-b border-gray-200 pb-2 mb-2">
              <Text className="flex-1 font-bold text-center">Parameter</Text>
              <Text className="flex-1 font-bold text-center text-purple-600">
                Person 1 (Pria)
              </Text>
              <Text className="flex-1 font-bold text-center text-blue-600">
                Person 2 (Wanita)
              </Text>
            </View>

            <View className="flex-row py-2 border-b border-gray-100">
              <Text className="flex-1 text-center font-medium">Expression</Text>
              <Text className="flex-1 text-center text-purple-600 font-bold">
                {calculatedResults.person1.expression}
              </Text>
              <Text className="flex-1 text-center text-blue-600 font-bold">
                {calculatedResults.person2.expression}
              </Text>
            </View>

            <View className="flex-row py-2 border-b border-gray-100">
              <Text className="flex-1 text-center font-medium">Time</Text>
              <Text className="flex-1 text-center text-purple-600 font-bold">
                {calculatedResults.person1.time}
              </Text>
              <Text className="flex-1 text-center text-blue-600 font-bold">
                {calculatedResults.person2.time}
              </Text>
            </View>

            <View className="flex-row py-2 border-b border-gray-100">
              <Text className="flex-1 text-center font-medium">
                Heart Desire
              </Text>
              <Text className="flex-1 text-center text-purple-600 font-bold">
                {calculatedResults.person1.heart}
              </Text>
              <Text className="flex-1 text-center text-blue-600 font-bold">
                {calculatedResults.person2.heart}
              </Text>
            </View>

            <View className="flex-row py-2 border-b border-gray-100">
              <Text className="flex-1 text-center font-medium">Birth</Text>
              <Text className="flex-1 text-center text-purple-600 font-bold">
                {calculatedResults.person1.birth}
              </Text>
              <Text className="flex-1 text-center text-blue-600 font-bold">
                {calculatedResults.person2.birth}
              </Text>
            </View>

            <View className="flex-row py-2 border-b border-gray-100">
              <Text className="flex-1 text-center font-medium">Ultimate</Text>
              <Text className="flex-1 text-center text-purple-600 font-bold">
                {calculatedResults.person1.ultimate}
              </Text>
              <Text className="flex-1 text-center text-blue-600 font-bold">
                {calculatedResults.person2.ultimate}
              </Text>
            </View>

            <View className="flex-row py-2 border-b border-gray-100">
              <Text className="flex-1 text-center font-medium">Habit</Text>
              <Text className="flex-1 text-center text-purple-600 font-bold">
                {calculatedResults.person1.habit}
              </Text>
              <Text className="flex-1 text-center text-blue-600 font-bold">
                {calculatedResults.person2.habit}
              </Text>
            </View>

            <View className="flex-row py-2 border-b border-gray-100">
              <Text className="flex-1 text-center font-medium">
                Plan of Expression
              </Text>
              <Text className="flex-1 text-center text-purple-600 font-bold">
                {calculatedResults.person1.planOfExpression}
              </Text>
              <Text className="flex-1 text-center text-blue-600 font-bold">
                {calculatedResults.person2.planOfExpression}
              </Text>
            </View>

            <View className="flex-row py-2">
              <Text className="flex-1 text-center font-medium">
                Point of Intensification
              </Text>
              <Text className="flex-1 text-center text-purple-600 font-bold">
                {calculatedResults.person1.pointOfIntensification}
              </Text>
              <Text className="flex-1 text-center text-blue-600 font-bold">
                {calculatedResults.person2.pointOfIntensification}
              </Text>
            </View>
          </View>

          {/* Match Parameter */}
          <View className="p-4 bg-gray-50 rounded-lg mb-6">
            <Text className="text-xl font-bold text-center mb-2 text-green-800">
              Match
            </Text>

            {renderCompatibilityMeter(calculatedResults.match.percentage)}

            <Text className="text-lg text-center mb-4 text-gray-700">
              Berdasarkan nilai Time Person 1 ({calculatedResults.person1.time})
              dan Person 2 ({calculatedResults.person2.time})
            </Text>

            <View className="bg-white p-4 rounded-lg">
              <Text className="text-gray-800 leading-6">
                {calculatedResults.match.explanation}
              </Text>
            </View>
          </View>

          {/* Harmony Parameter */}
          <View className="p-4 bg-gray-50 rounded-lg">
            <Text className="text-xl font-bold text-center mb-2 text-blue-800">
              Harmony
            </Text>

            {renderCompatibilityMeter(calculatedResults.harmony)}

            <Text className="text-lg text-center mb-4 text-gray-700">
              Berdasarkan vlookup 14 kombinasi parameter antara Person 1 dan
              Person 2
            </Text>

            <View className="mb-4">
              <Text className="text-lg font-semibold mb-2">
                14 Kombinasi Harmony:
              </Text>

              {renderAreaScore(
                "Expression vs Expression",
                Math.round(
                  getHarmonyPercentage(
                    calculatedResults.person1.expression,
                    calculatedResults.person2.expression,
                  ),
                ),
              )}
              {renderAreaScore(
                "Expression vs Time",
                Math.round(
                  getHarmonyPercentage(
                    calculatedResults.person1.expression,
                    calculatedResults.person2.time,
                  ),
                ),
              )}
              {renderAreaScore(
                "Expression vs Heart",
                Math.round(
                  getHarmonyPercentage(
                    calculatedResults.person1.expression,
                    calculatedResults.person2.heart,
                  ),
                ),
              )}
              {renderAreaScore(
                "Time vs Time",
                Math.round(
                  getHarmonyPercentage(
                    calculatedResults.person1.time,
                    calculatedResults.person2.time,
                  ),
                ),
              )}
              {renderAreaScore(
                "Time vs Expression",
                Math.round(
                  getHarmonyPercentage(
                    calculatedResults.person1.time,
                    calculatedResults.person2.expression,
                  ),
                ),
              )}
              {renderAreaScore(
                "Time vs Heart",
                Math.round(
                  getHarmonyPercentage(
                    calculatedResults.person1.time,
                    calculatedResults.person2.heart,
                  ),
                ),
              )}
              {renderAreaScore(
                "Heart vs Time",
                Math.round(
                  getHarmonyPercentage(
                    calculatedResults.person1.heart,
                    calculatedResults.person2.time,
                  ),
                ),
              )}
              {renderAreaScore(
                "Heart vs Expression",
                Math.round(
                  getHarmonyPercentage(
                    calculatedResults.person1.heart,
                    calculatedResults.person2.expression,
                  ),
                ),
              )}
              {renderAreaScore(
                "Heart vs Heart",
                Math.round(
                  getHarmonyPercentage(
                    calculatedResults.person1.heart,
                    calculatedResults.person2.heart,
                  ),
                ),
              )}
              {renderAreaScore(
                "Birth vs Birth",
                Math.round(
                  getMinorHarmonyPercentage(
                    calculatedResults.person1.birth,
                    calculatedResults.person2.birth,
                  ) * 100,
                ),
              )}
              {renderAreaScore(
                "Ultimate vs Ultimate",
                Math.round(
                  getMinorHarmonyPercentage(
                    calculatedResults.person1.ultimate,
                    calculatedResults.person2.ultimate,
                  ) * 100,
                ),
              )}
              {renderAreaScore(
                "Habit vs Habit",
                Math.round(
                  getMinorHarmonyPercentage(
                    calculatedResults.person1.habit,
                    calculatedResults.person2.habit,
                  ) * 100,
                ),
              )}
              {renderAreaScore(
                "Plan of Expression vs Plan of Expression",
                Math.round(
                  getMinorHarmonyPercentage(
                    calculatedResults.person1.planOfExpression,
                    calculatedResults.person2.planOfExpression,
                  ) * 100,
                ),
              )}
              {renderAreaScore(
                "Point of Intensification vs Point of Intensification",
                Math.round(
                  getMinorHarmonyPercentage(
                    calculatedResults.person1.pointOfIntensification,
                    calculatedResults.person2.pointOfIntensification,
                  ) * 100,
                ),
              )}
            </View>
          </View>
        </View>
      )}

      {/* Date Picker Modals */}
      {renderDatePickerModal(1)}
      {renderDatePickerModal(2)}

      {/* Match Explanation Modal */}
      <Modal
        visible={showMatchModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMatchModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-11/12 max-h-4/5">
            <Text className="text-xl font-bold text-center mb-4 text-green-600">
              Match Analysis - {calculatedResults?.match.percentage}%
            </Text>

            <ScrollView className="mb-4">
              <Text className="text-base leading-6 text-gray-800">
                {calculatedResults?.match.explanation}
              </Text>
            </ScrollView>

            <TouchableOpacity
              className="bg-green-500 py-3 px-6 rounded-lg"
              onPress={() => setShowMatchModal(false)}
            >
              <Text className="text-white text-center font-medium text-lg">
                Tutup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
