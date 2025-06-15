import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { getPola, calculateGrafologiIndex } from "../utils/numerologyUtils";

interface NumerologyResultsProps {
  name: string;
  birthdate: Date;
  gender: "Male" | "Female";
  isPremium?: boolean;
}

export default function NumerologyResults({
  name = "",
  birthdate = new Date(),
  gender = "Male",
  isPremium = false,
}: NumerologyResultsProps) {
  const patterns = getPola(name, birthdate, gender);
  const grafologiResult = calculateGrafologiIndex(name);
  const [selectedParameter, setSelectedParameter] = useState<string | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const getHaraDescription = (hara: number) => {
    const descriptions: { [key: number]: string } = {
      1: "🤠Positif dalam kemandirian dan independensi, perkembangan (awal) yang baru",
      2: "🤝Peningkatan koneksi dan kerjasama, dibantu oleh suatu hubungan yang berjalan baik dan lama",
      3: "💡Potensi ide dan kreativitas, pembawaan santai dan kenikmatan atas segala hal yang perlu dikendalikan",
      4: "✔️Potensi karir dan hubungan yang menguat, berpindah untuk bergerak maju, tanggung jawab terselesaikan dengan praktis",
      5: "Positif dalam mobilitas dan sumber daya, namun waspada pada ❌Segala potensi buruk ; apes, mudah dikelabui, pengkhianatan, celaka, sakit, berakhir buruk",
      6: "🏡Potensi berkembang dalam hal kekeluargaan, sosial, membantu tua muda, perbaikan, kesembuhan, kemajuan",
      7: "Perenung😠Potensi masalah finansial, konflik emosional (timbul celaka), plin-plan, gangguan syaraf, sel abnormal",
      8: "🤕Potensi celaka, sakit (pemulihan lama), salah diagnosis, mengakhiri sesuatu secara buruk (berdampak serius)",
      9: "🤧Potensi gangguan finansial, gangguan obat, kurang sehat, berakhir (apa saja) karena dilakukan pihak lain",
      11: "🤢Potensi gagal usaha, jadi kambing hitam, tekanan psikologi, komplikasi, pisah karena beda prinsip, gangguan kesehatan",
      13: "😳Potensi kecewa atas hasil (bangkrut,rugi) rumah tangga maupun bisnis, dikhianati oleh orang dekat",
    };
    return descriptions[hara] || "Deskripsi tidak tersedia";
  };

  const getExpressionDescription = (expression: number) => {
    const descriptions: { [key: number]: string } = {
      1: "You are destined to be a leader in your field of work. You should learn to rely on your own abilities, show courage and determination and avoid the negative aspects such as egotism and selfishness. People will look upon you for guidance and direction from time to time and you should be prepared for it. You were born to become an outstanding person in a line of work in this life.",
      2: "Cooperation, diplomacy and peaceful coexistence are the goals of life. The development takes place in partnerships rather than independently. You may called upon for arbitration and peacemaking from time to time. Cooperation, sharing and association will bring you success. If negative aspects can be avoided you should be known as a peacemaker.",
      3: "Popularity, happiness for the self and others, love, romance and material possessions are the salient features of life, provided a positive use of talent is made. You are joy giver to others and you were born to make others happy. Through imagination, sincerity and cheerfulness you are destined to show light to humanity on some line of creativity.",
      4: "You are destined to take the responsibility and others will depend on you for help and support. Construction, organisation and management will keep you occupied for the rest of your life. Many a time the problems of relatives will come to you, and limitations in life may irritate you. Through patience, determination, order, sincerity, honesty and service you will provide security for others and yourself if negative aspects are overcome.",
      5: 'You were born to deal with people in general and to promote "freedom" and "progress". Change, new circumstances, new apporaches, variety, versatility and unexpected happenings will be the salient features of your life. You may find it difficult to work on the same lines or with the same people for long. You will teach people to achieve "liberty" and live happily, if negative is controlled.',
      6: "You came in this world to serve humanity with love, duty, responsibility and charitable deeds. You will be known as a dependable person. You should be generous to relatives but not to the pointof sacrifice. People will knock at your door for help throughout your life and the mor you do for others, the more love, comfort and money will surround you. For your own progress you need beauty, companionship, love and harmony. You are capable of exploring the philosophy of life and achieving spiritual heights.",
      7: "You are destined to search for wisdom or hidden truths in the scientific, criminal, philosophical or religious field. You may find yourself lonely even when in the midst of people and you may be out of the common class. You may go deep into the philosophy of life; experiment, test and demonstrate the facts discovered by others. Popularity, love and respect should come to you for the knowledge attained and you should be known as an educator. Personal business, love and even marriage may be sacrificed on the hard path you are following, but you may get greater satisfaction in finding the truth (more often on the occult or spiritual lines) and educating the people.",
      8: "Management, organisation and administration should lead you to a position of authority and recognition. You will have to make proper assessment of people and events from time to time, which is not an easy task. If the philosophical faculty is developed and an unprejudiced judgement is made, your reward will be its accomplishment. Money may not always be the lines of develupment in addition to business for which you might be famous.",
      9: "You are destined to be popular on some line of philanthropic, humanitarian or charitable work. Love of brotherhood and service to mankind will be part of your personality, on the one hand while love, romance, music and art should deeply interest you on the other. Compassion, generosity and understanding the needs of others will make you very popular. Selfishness, personal love and lack of forgiveness can prove detrimental and bring disappointments. Being impersonal and developing universal love can make you a spiritual leader.",
      11: "Inspiration, spiritual awareness (often latent), intuition and psychic ability can lead to inner happiness and illumination if the negative aspects of all are controlled. You are destined to achieve higher values of life; and family life, material gains, and social status may be easily lost if strictly adhered to. You should overcome sensitivity, nervousness and self-centredness and take material and social life only lightly. You are bestowed with the powers of achieving spiritual heights for yourself and showing light to others. Sometime suffer on account of material loss thereby undergoing repeated disappointments in relations and partnerships.",
      22: 'Capability of handling big projects efficiently is likely to place you in a position of authority on one line of work in the material world at some point of life. You are likely to get significant undertakings in life. But the accomplishment will depend on your checking the desire to " take more work than you can handle" and " keeping the spiritual awareness from interference into practical approach. On the other hand if you are inclined to work on mystic and occult lines you may do a lot of good to others and become famous as a lightgiver.',
    };
    return descriptions[expression] || "Deskripsi tidak tersedia";
  };

  const getTimeDescription = (time: number) => {
    const descriptions: { [key: number]: string } = {
      1: "Penuh gagasan kreatif, berkemauan keras, mandiri, berani, dan penuh perjuangan. Kekurangan yg dibawa adalah keras kepala, kebohongan, ingin mendominasi dan egois yg menyebabkan diri merasa mengetahui segalanya. Kebijaksanaan adalah fokus utama. Memiliki analisa yang kuat. Jika digunakan dengan benar, akan menjadi orang yang terpelajar. Biasanya tidak segera menjawab YA atau TIDAK, akan berpikir lebih dulu. Sangat detil dalam banyak hal. Sangat kuat dalam kreativitas dan sangat waspada. Karakter tersebut akan menuntun menghasilkan kekayaan. Pandai menghibur dan andal dalam menjalin relasi. Kekayaan biasanya diraih sekitar umur 32 hingga 42. Punya keterampilan kepemimpinan. Lawan jenis banyak yang tertarik. Akan berpenampilan semakin baik atau cantik saat semakin tua - diatas usia 30-an dan setelahnya, akan semakin terlihat rupawan. Sisi negatifnya adalah sering merasa kesepian, merasa diri seorang pengembara. Berhati-hati ketika menganalisa seseorang atau suatu situasi, analisa yang salah akan membawa kepada masalah yang seharusnya tidak perlu terjadi.",
      2: 'Penuh dengan perdamaian, rendah hati, bersahabat, dan memiliki pengaruh spiritual. Kekurangan yang dibawa adalah perasaan yang halus dan mudah terluka, terlalu memperhatikan hal-hal kecil hingga banyak waktu terbuang. Terampil dan memiliki kepribadian yang menyenangkan serta banyak bicara. Andal dalam pekerjaan yang berhubungan dengan kerjasama. Sangat tenang, bersahabat, dan lembut hati. Selalu menekankan kerapihan, kebersihan dan sangat terorganisir. Mau bekerja keras, sangat dewasa pola pikirnya. Biasa bergaul dengan orang yang lebih tua. Punya kemampuan untuk mengarahkan dan menyelesaikan pekerjaan. Sisi negatifnya adalah mau mendengarkan pendapat orang lain, tetapi mungkin tidak untuk mengikutinya. Keras kepala, banyak memicu omongan buruk dan cenderung "hanya bicara saja". Sangat pencemburu untuk masalah cinta.',
      3: "Penuh bakat seni, semangat juang, memiliki kemampuan untuk melihat 3 masa. Kekurangan yang dibawa adalah sifat boros, pembicaraan yg lepas, sukar memaafkan. Atraktif dan berpikiran panjang, tetapi sangat tidak sabar. Jelas dan tahu apa yang diinginkan serta tahu bagaimana dan dimana mendapatkannya. Sangat cepat membedakan yang baik dan buruk. Bisa menduduki posisi tinggi, kaya dan sejahtera. Baik hidupnya di mata masyarakat. Punya kemampuan dan talenta serta pandai mengambil keuntungan dari sebuah keadaan. Cepat marah, tetapi juga cepat reda. Seorang wanita cantik, atau seorang pria rupawan di usia muda. Sisi negatifnya adalah cenderung menggampangkan segala sesuatu dan tidak tegas. Kadang-kadang bisa nakal. Terkadang kasar ketika bicara. Ada pasang surut dalam pernikahan, dan jika tidak menjaganya dengan baik mungkin akan membawa petaka dan kekerasan. Biasanya berpikir bahwa diri benar dalam hal apapun yang dilakukan dan katakan, sedangkan orang lain salah.",
      4: "Penuh tanggungjawab, berpikir ilmiah, jujur dan setia. Kekurangan yang dibawa adalah keras kepala, suka mendebat dan ingin mendominasi, bersifat workaholic. Cerdas, artistik dan unggul dalam ujian hidup. Layak dipercaya dan mudah bergaul dalam masyarakat. Penuh welas asih dan kharismatik. Secara alamiah adalah seorang perencana dan pemikir, berpikir dahulu sebelum bertindak. Suka melakukan perjalanan dan menjalani gaya hidup bebas. Mempunyai kemampuan di usia yang sangat muda. Mampu segera bangkit setelah melewati kesulitan hidup. Jika seorang wanita, memanjakan pasangannya. Sisi negatifnya adalah lemah dalam mengumpulkan kekayaan. Harus berhati-hati dalam hubungan atau pernikahan, jika tidak akan melibatkan insiden buruk yang tidak perlu.",
      5: 'Penuh energi seksualitas, cinta kebebasan dan perubahan, penuh dengan akal dan tindakan yang cepat-cepat, mampu menghibur. Kekurangan yang dibawa adalah ketidaksetiaan dalam "cinta dan perkawinan", dan ketidakmapuan dalam mengendalikan kegelisahaan dan ketidakpuasan. Punya karakter yang sangat kuat. Lahir dengan jiwa kepemimpinan, biasanya memiliki posisi di atas banyak orang dalam hal pekerjaan. Punya insting yang kuat dalam banyak hal. Realistis dan pekerja keras. Bisa beradaptasi dan menyesuaikan diri dengan situasi atau keadaan yang sedang terjadi. Meski dihadapkan dengan rintangan hidup, tetapi jika dihadapkan dengan masalah keuangan selalu saja ada cara untuk mengatasinya. Sisi negatifnya adalah jika berasal dari keluarga kurang mampu, memiliki sifat keras kepala. Jika berada di jalan yang salah, cenderung berputar-putar bukan untuk tujuan yang baik, bahkan cenderung berbohong. Sangat pemilih dan cerewet untuk banyak hal dan masalah. Belajarlah untuk tidak seperti itu sehingga orang-orang akan lebih menghargai.',
      6: "Penuh dengan keseimbangan, tidak memikirkan diri sendiri, menyukai kegiatan kemanusiaan, setia dan teguh memikirkan kesejahteraan orang lain. Kekurangan yg dibawa adalah suka pujian dan popularitas, ketidakmampuan mengendalikan diri dalam pengorbanan. Ulet, cakap dalam mengontrol kekayaan dan kesejahteraan. Sangat sopan dan berselera tinggi. Memiliki karir bagus di bidang seni, keagamaan, atau pendidikan. Bisa menjadi figur yang cukup populer. Tidak mudah mendengarkan orang lain khususnya atasan, tetapi memikirkan dan memperhatikan bawahan. Merawat keluarga dan kerabat dekat. Berorientasi pada keluarga. Sisi negatifnya adalah sombong dan berbangga diri, tidak mau melakukan pekerjaan sederhana. Dalam hal hubungan relasi, bersifat posesif dan ingin selalu mengontrol setiap orang dan segala sesuatu, namun biasanya tidak akan mengakui. Buang sikap ingin mendominasi sehingga orang yang dicintai akan lebih sayang.",
      7: 'Penuh kecerdasan, kesendirian, mistik, kepribadian yang penuh daya tarik. Kekurangan yang dibawa adalah sulit menyatakan diri, kurang percaya kepada orang lain, perhatian berlebihan terhadap diri sendiri sehingga kurang pengertian terhadap kebutuhan "pasangannya". Detail dalam mengurus berbagai hal. Tidak akan pernah melupakan siapa saja yang pernah membantu. Mampu mengubah dan berbalik arah pada suatu situasi. Senang mengejar ketenaran dan keberuntungan. Andal dalam mengurus bidang entertaint/hiburan. Bisa menjadi tokoh spiritual/pemimpin religius, biasanya di usia 50-an ke atas. Sisi negatifnya adalah suka mendebat, tidak tegas/sering berubah pendapat dan kurang cepat mengambil keputusan. Cenderung memiliki masalah dalam pernikahan. Meski pandai bersyukur, ada kecenderungan bahwa diri sendiri mungkin tidak menunjukkan rasa syukur terhadap orang lain.',
      8: "Penuh idealisme, materialistis, penjaga rahasia yang terpercaya. Kekurangan yang dibawa adalah keinginan untuk memamerkan kekuasaan, kurangnya rasa kemanusiaan dan keras kepala. Hampir semua orang dengan Time 8 memperoleh tragedi sebagai hasil akhir. Pendiam, konservatif, cenderung pasif, tetapi bersemangat diantara yang lain. Sangat bertanggung jawab, walau kadang merasa tertekan. Penuh kebajikan dan layak dipercaya. Tidak akan mempermainkan orang. Terlihat keras di luar, tetapi sesungguhnya lembut di dalam. Sisi negatifnya adalah pemarah, suka menunda-nunda dan cenderung menunggu atau melihat. Seringkali akan membuat kehilangan kesempatan. Perlu untuk lebih pandai melihat situasi. Terlalu berhati-hati tidak akan mendapatkan apa-apa. Yakinlah pada pandangan sendiri dan lakukan sesuatu dengan cara sendiri. Terkadang tidak jelas dengan apa yang dikerjakan. Jika berada di jalan yang salah, maka akan menjadi seorang penggertak, ingin mendominasi, egois, kejam dan hanya memikirkan kemajuan diri sendiri.",
      9: "Penuh perikemanusiaan, murah hati, rasa kasih, dan berjiwa spiritual. Kekurangan yang dibawa adalah terlalu perasa, tergesa-gesa dalam mengambil keputusan, mementingkan diri sendiri, posesif, tidak toleran dan bahkan curang. Sangat optimis dan berpikiran terbuka. Suka terlihat indah/necis dan berpakaian yang bagus. Bersahaja, terlihat keras tapi lembut di dalam. Sangat waspada dan sensitif. Tahu kapan dan bagaimana untuk menyerang dan bertahan. Pandai mengambil hati orang lain. Melakukan segala sesuatu dengan cepat tetapi kurang mendetail. Cukup emosional. Andal dalam bekerja. Punya tujuan dan impian besar. Apapun yang dilakukan lebih sering menuai sukses daripada yang tidak. Sisi negatifnya adalah sering merasa kesepian pada usia sepuh. Ada tingkat keserakahan yang tinggi dalam diri. Cenderung lupa memperhatikan bawahan. Tidak punya banyak teman sejati. Gaya hidup cenderung materialistis.",
    };
    return descriptions[time] || "Deskripsi tidak tersedia";
  };

  const showParameterDescription = (
    parameterType: string,
    value: number | string,
  ) => {
    let description = "";
    let title = "";

    switch (parameterType) {
      case "hara":
        title = `Hara ${value}`;
        description = getHaraDescription(Number(value));
        break;
      case "expression":
        title = `Expression ${value}`;
        description = getExpressionDescription(Number(value));
        break;
      case "time":
        title = `Time ${value}`;
        description = getTimeDescription(Number(value));
        break;
      case "dimensional":
        title = "Dimensional Analysis";
        description = `Physical: ${patterns.physical}\nMental: ${patterns.mental}\nEmotion: ${patterns.emotion}\nIntuition: ${patterns.intuition}\n\nAnalisis dimensional menunjukkan keseimbangan aspek fisik, mental, emosional, dan intuisi dalam kepribadian Anda.`;
        break;
      case "synchronize":
        title = "Synchronize Score";
        description = `Nilai Synchronize: ${patterns.synchronize}\n\nSkor sinkronisasi menunjukkan seberapa selaras berbagai aspek kehidupan Anda. Nilai di atas 0.6 menunjukkan sinkronisasi yang baik.`;
        break;
      case "coherence":
        title = "Coherence Value";
        description = `Nilai Coherence: ${patterns.coherence}\n\nNilai koherensi menunjukkan konsistensi dan keterpaduan dalam dimensi kepribadian Anda. Nilai di atas 0.6 menunjukkan koherensi yang baik.`;
        break;
      case "synergize":
        title = "Synergize Value";
        description = `Nilai Synergize: ${patterns.synergize}\n\nNilai sinergi menunjukkan kemampuan berbagai aspek kehidupan untuk bekerja sama secara harmonis. Nilai di atas 70% menunjukkan sinergi yang baik.`;
        break;
      case "productive":
        title = "Productive Value";
        description = `Nilai Productive: ${patterns.productive}\n\nNilai produktivitas menunjukkan kapasitas Anda untuk menghasilkan dan mencapai tujuan. Nilai di atas 70% menunjukkan produktivitas yang baik.`;
        break;
      case "momentum":
        title = "Momen Sukses Value";
        description = `Nilai Momen Sukses: ${patterns.momenSukses}\n\nIndeks momen sukses menunjukkan potensi dan timing untuk mencapai kesuksesan. Nilai di atas 0.6 menunjukkan momentum yang baik.`;
        break;
    }

    setSelectedParameter(`${title}\n\n${description}`);
    setModalVisible(true);
  };

  const renderIntensityChart = () => {
    return (
      <View className="flex-row justify-between mt-4 mb-2">
        {Object.entries(patterns.angka_intensitas).map(([number, count]) => (
          <View key={number} className="items-center">
            <Text className="text-lg font-bold">{number}</Text>
            <View
              className="bg-purple-500 w-6 rounded-t-md"
              style={{ height: Math.max(count * 10, 5) }}
            />
            <Text className="text-xs">{count}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView className="bg-white p-4 rounded-lg">
      <View className="border-b border-gray-200 pb-4 mb-4">
        <Text className="text-2xl font-bold text-purple-800">
          {patterns.namaNormal}
        </Text>
        <Text className="text-gray-600">{patterns.tglLahirFormat}</Text>
        <Text className="text-gray-600">Gender: {gender}</Text>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-orange-50 p-3 rounded-lg"
          onPress={() => showParameterDescription("hara", patterns.hara)}
        >
          <View className="bg-orange-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-orange-800 text-center">
              Hara
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              [1, 2, 3, 4, 6].includes(patterns.hara)
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {patterns.hara}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-indigo-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("expression", patterns.destiny)
          }
        >
          <View className="bg-indigo-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-indigo-800 text-center">
              Expression
            </Text>
          </View>
          <Text className="text-2xl font-bold text-indigo-800 text-center">
            {patterns.destiny}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-blue-50 p-3 rounded-lg"
          onPress={() => showParameterDescription("time", patterns.time)}
        >
          <View className="bg-blue-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-blue-800 text-center">
              Time
            </Text>
          </View>
          <Text className="text-2xl font-bold text-blue-800 text-center">
            {patterns.time}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-blue-50 p-3 rounded-lg"
          onPress={() => showParameterDescription("dimensional", "")}
        >
          <View className="bg-blue-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-blue-800 text-center">
              Dimensional Analysis
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600 text-sm">
              Physical:{" "}
              <Text
                className={`font-bold ${patterns.physical < 60 ? "text-red-600" : "text-gray-800"}`}
              >
                {patterns.physical}
              </Text>
            </Text>
            <Text className="text-gray-600 text-sm">
              Mental:{" "}
              <Text
                className={`font-bold ${patterns.mental < 60 ? "text-red-600" : "text-gray-800"}`}
              >
                {patterns.mental}
              </Text>
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600 text-sm">
              Emotion:{" "}
              <Text
                className={`font-bold ${patterns.emotion < 60 ? "text-red-600" : "text-gray-800"}`}
              >
                {patterns.emotion}
              </Text>
            </Text>
            <Text className="text-gray-600 text-sm">
              Intuition:{" "}
              <Text
                className={`font-bold ${patterns.intuition < 60 ? "text-red-600" : "text-gray-800"}`}
              >
                {patterns.intuition}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-purple-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("synchronize", patterns.synchronize)
          }
        >
          <View className="bg-purple-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-purple-800 text-center">
              Synchronize Score
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              patterns.synchronize < 0.6 ? "text-red-600" : "text-purple-800"
            }`}
          >
            {patterns.synchronize}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-green-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("coherence", patterns.coherence)
          }
        >
          <View className="bg-green-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-green-800 text-center">
              Coherence Value
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              patterns.coherence < 0.6 ? "text-red-600" : "text-green-800"
            }`}
          >
            {patterns.coherence}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-teal-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("synergize", patterns.synergize)
          }
        >
          <View className="bg-teal-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-teal-800 text-center">
              Synergize Value
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              parseFloat(patterns.synergize.replace("%", "")) < 60
                ? "text-red-600"
                : "text-teal-800"
            }`}
          >
            {patterns.synergize}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-cyan-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("productive", patterns.productive)
          }
        >
          <View className="bg-cyan-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-cyan-800 text-center">
              Productive Value
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              parseFloat(patterns.productive.replace("%", "")) < 60
                ? "text-red-600"
                : "text-cyan-800"
            }`}
          >
            {patterns.productive}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <TouchableOpacity
          className="bg-emerald-50 p-3 rounded-lg"
          onPress={() =>
            showParameterDescription("momentum", patterns.momenSukses)
          }
        >
          <View className="bg-emerald-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-emerald-800 text-center">
              Momen Sukses Value
            </Text>
          </View>
          <Text
            className={`text-2xl font-bold text-center ${
              parseFloat(patterns.momenSukses) < 0.6
                ? "text-red-600"
                : "text-emerald-800"
            }`}
          >
            {patterns.momenSukses}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <View className="bg-purple-50 p-3 rounded-lg">
          <View className="bg-purple-200 px-2 py-1 rounded mb-2">
            <Text className="text-sm font-medium text-purple-800 text-center">
              Indeks Grafologi
            </Text>
          </View>
          <Text className="text-2xl font-bold text-center text-purple-800">
            {grafologiResult.persValue}
          </Text>
          <Text className="text-gray-600 text-center mt-1 text-sm">
            Nilai: {grafologiResult.indexValue}
          </Text>

          <View className="mt-4">
            <Text className="text-lg font-semibold mb-2">Saran Potensial</Text>
            <View className="flex-row flex-wrap">
              {grafologiResult.suggestions.map((suggestion, index) => (
                <View
                  key={index}
                  className="mr-2 mb-2 px-3 py-1 rounded-md"
                  style={{
                    backgroundColor: suggestion.isPositive
                      ? "#d1fae5"
                      : "#fee2e2",
                  }}
                >
                  <Text
                    style={{
                      color: suggestion.isPositive ? "#047857" : "#b91c1c",
                    }}
                  >
                    G{index + 1}: {suggestion.value}
                  </Text>
                </View>
              ))}
            </View>
            <View className="mt-2">
              {grafologiResult.suggestions.map((suggestion, index) => (
                <View
                  key={index}
                  className="mb-3 p-3 rounded-md"
                  style={{
                    backgroundColor: suggestion.isPositive
                      ? "#d1fae5"
                      : "#fee2e2",
                  }}
                >
                  <Text
                    style={{
                      color: suggestion.isPositive ? "#047857" : "#b91c1c",
                    }}
                  >
                    G{index + 1}: {suggestion.deskValue}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View
            className="mt-4 p-3 rounded-md"
            style={{
              backgroundColor: grafologiResult.deskIsPositive
                ? "#d1fae5"
                : "#fee2e2",
            }}
          >
            <Text
              style={{
                color: grafologiResult.deskIsPositive ? "#047857" : "#b91c1c",
              }}
            >
              {grafologiResult.desk}
            </Text>
          </View>
        </View>
      </View>

      {isPremium ? (
        <>
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-2">
              Advanced Analysis
            </Text>

            <View className="mb-4">
              <Text className="text-lg font-semibold mb-2">Core Numbers</Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Character Number</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_karakter}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Expression Number</Text>
                  <Text className="text-2xl font-bold">{patterns.destiny}</Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Soul Number</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_vokal}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Personality Number</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_konsonan}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-lg font-semibold mb-2">
                Number Intensity
              </Text>
              {renderIntensityChart()}
            </View>

            <View className="mb-4">
              <Text className="text-lg font-semibold mb-2">
                Personal Development
              </Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Self Potential</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_potensi_diri}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Attitude Number</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_sikap}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Growth Number</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_pertumbuhan}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-xl font-semibold mb-2">
                Birth Date Analysis
              </Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/3 mb-3">
                  <Text className="text-gray-600">Day</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_ultah}
                  </Text>
                </View>
                <View className="w-1/3 mb-3">
                  <Text className="text-gray-600">Month</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_bulan}
                  </Text>
                </View>
                <View className="w-1/3 mb-3">
                  <Text className="text-gray-600">Year</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.angka_tahun_lahir}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-xl font-semibold mb-2">
                Pythagorean Analysis
              </Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Expression</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.expression}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Soul Urge</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.soulUrge}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Personality</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.personality}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-xl font-semibold mb-2">
                Challenge Numbers
              </Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Challenge 1</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.challenge1}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Challenge 2</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.challenge2}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Challenge 3</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.challenge3}
                  </Text>
                </View>
                <View className="w-1/2 mb-3">
                  <Text className="text-gray-600">Challenge 4</Text>
                  <Text className="text-2xl font-bold">
                    {patterns.challenge4}
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-xl font-semibold mb-2">
                Current Year Analysis
              </Text>
              <View className="bg-purple-50 p-4 rounded-lg">
                <Text className="text-gray-600">Personal Year Number</Text>
                <Text className="text-3xl font-bold text-purple-800">
                  {patterns.personalYear}
                </Text>
                <Text className="text-gray-600 mt-2">
                  {patterns.personalYear === 1 &&
                    "A year of new beginnings and opportunities."}
                  {patterns.personalYear === 2 &&
                    "A year for partnerships and patience."}
                  {patterns.personalYear === 3 &&
                    "A year of creativity and self-expression."}
                  {patterns.personalYear === 4 &&
                    "A year of building foundations and hard work."}
                  {patterns.personalYear === 5 &&
                    "A year of change and adventure."}
                  {patterns.personalYear === 6 &&
                    "A year of responsibility and relationships."}
                  {patterns.personalYear === 7 &&
                    "A year of reflection and spiritual growth."}
                  {patterns.personalYear === 8 &&
                    "A year of achievement and financial focus."}
                  {patterns.personalYear === 9 &&
                    "A year of completion and letting go."}
                  {patterns.personalYear === 11 &&
                    "A master year of intuition and spiritual insight."}
                  {patterns.personalYear === 22 &&
                    "A master year of building and manifesting great works."}
                  {patterns.personalYear === 33 &&
                    "A master year of spiritual teaching and healing."}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View className="bg-purple-100 p-4 rounded-lg mb-6">
          <Text className="text-lg font-semibold text-purple-800 mb-2">
            Premium Analysis
          </Text>
          <Text className="text-gray-700 mb-3">
            Unlock advanced analysis, lifetime reports, and more with our
            premium membership.
          </Text>
          <TouchableOpacity className="bg-purple-600 py-2 px-4 rounded-md items-center">
            <Text className="text-white font-medium">Upgrade to Premium</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-white p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-purple-800">
              Parameter Detail
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-purple-600 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-medium">Tutup</Text>
            </TouchableOpacity>
          </View>
          <ScrollView className="flex-1">
            <Text className="text-base leading-6 text-gray-800">
              {selectedParameter}
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}
