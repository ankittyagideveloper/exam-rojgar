export const TimeMockData = {
  "paperName": "Time, Speed & Distance Mock Test",
  "title": "EXAM ROJGAAR MOCKS",
  "subtitle": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। / You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
  "subject": "Quantitative Aptitude",
  "category": "Sectional Mocks",
  "duration": 30,
  "marksCorrect": 1,
  "marksWrong": 0.33,
  "telegramLink": "https://t.me/ExamRojgaar",
  "storageKey": "ExamRojgaar_TimeMockData",
  "questions": [
    {
      "id": 1,
      "eng": "In a 150-meter race, R beats S by 6 meters. In a 250-meter race, R beats S by 2 seconds. If R runs for 30 seconds in another race, then by how many meters does he beat S?",
      "hin": "150 मीटर की दौड़ में R, S को 6 मीटर से हराता है। 250 मीटर की दौड़ में R, S को 2 सेकंड से हराता है। यदि किसी दौड़ में R 30 सेकंड तक दौड़ता है, तो वह S को कितने मीटर से हराएगा?",
      "optE": [
        "5.75 m",
        "7.25 m",
        "6.75 m",
        "6.25 m"
      ],
      "optH": [
        "5.75 मीटर",
        "7.25 मीटर",
        "6.75 मीटर",
        "6.25 मीटर"
      ],
      "ans": 3,
      "solE": "From the 150 m race, speed ratio R:S = 150:144 = 25:24. Using the 250 m race, R takes 48 seconds while S takes 50 seconds. Hence R's speed = 250/48 m/s. In 30 seconds, R covers 156.25 m while S covers 150 m. Therefore, R beats S by 6.25 m.",
      "solH": "150 मीटर की दौड़ से गति अनुपात R:S = 150:144 = 25:24 मिलता है। 250 मीटर की दौड़ में R को 48 सेकंड तथा S को 50 सेकंड लगते हैं। इसलिए R की गति 250/48 मी/से है। 30 सेकंड में R 156.25 मीटर तथा S 150 मीटर दौड़ता है। अतः R, S को 6.25 मीटर से हराता है।"
    },
    {
      "id": 2,
      "eng": "In a 1200 m race, Amit gives Bhushan a head start of 200 m. Amit starts 20 seconds after Bhushan. Amit overtakes Bhushan 4 minutes after he starts running and finishes the race 10 seconds before Bhushan. What is Amit's speed?",
      "hin": "1200 मीटर की दौड़ में अमित, भूषण को 200 मीटर की बढ़त देता है। अमित, भूषण के 20 सेकंड बाद दौड़ना शुरू करता है। अमित अपने दौड़ने के 4 मिनट बाद भूषण को पकड़ लेता है और भूषण से 10 सेकंड पहले दौड़ समाप्त करता है। अमित की गति क्या है?",
      "optE": [
        "44/9 m/s",
        "40/9 m/s",
        "10/3 m/s",
        "31/9 m/s"
      ],
      "optH": [
        "44/9 मी/से",
        "40/9 मी/से",
        "10/3 मी/से",
        "31/9 मी/से"
      ],
      "ans": 1,
      "solE": "Let Amit's speed be x m/s. Bhushan covers 1000 m in (20+240)=260 seconds before being overtaken. Hence Bhushan's speed =1000/260. Using finishing times, Amit's total time is 1200/x and Bhushan's total time is 1000/(1000/260). Solving gives x=40/9 m/s.",
      "solH": "मान लें अमित की गति x मी/से है। भूषण, अमित द्वारा पकड़े जाने तक 260 सेकंड में 1000 मीटर चलता है, अतः उसकी गति 1000/260 मी/से होगी। अंतिम समयों के आधार पर समीकरण बनाने और हल करने पर अमित की गति 40/9 मी/से प्राप्त होती है।"
    },
    {
      "id": 3,
      "eng": "In a circular race of length 1530 m, Shahrukh and Amir start together from the same point and run in the same direction. Shahrukh completes one round in 85 seconds while Amir completes one round in 90 seconds. How many different meeting points are there on the track?",
      "hin": "1530 मीटर की वृत्ताकार दौड़ में शाहरुख और आमिर एक ही बिंदु से एक ही दिशा में दौड़ना शुरू करते हैं। शाहरुख एक चक्कर 85 सेकंड में तथा आमिर 90 सेकंड में पूरा करता है। ट्रैक पर कुल कितने अलग-अलग मिलने के बिंदु होंगे?",
      "optE": [
        "1",
        "35",
        "11",
        "2"
      ],
      "optH": [
        "1",
        "35",
        "11",
        "2"
      ],
      "ans": 0,
      "solE": "They meet every LCM-related interval. Since gcd(85,90)=5, the number of distinct meeting points is gcd(17,18)=1. Hence they always meet only at the starting point.",
      "solH": "दोनों का मिलने का पैटर्न उनके चक्कर लगाने के समय पर निर्भर करता है। 85 और 90 का महत्तम समापवर्तक 5 है तथा 17 और 18 सहाभाज्य हैं। इसलिए दोनों केवल प्रारंभिक बिंदु पर ही मिलते हैं।"
    },
    {
      "id": 4,
      "eng": "A, B and C run a 1200 m race. A gives B a head start of 300 m and C a head start of 600 m. A finishes 30 seconds before B and 60 seconds before C. If A's speed is 10 m/s, find the respective speeds of B and C.",
      "hin": "A, B और C 1200 मीटर की दौड़ दौड़ते हैं। A, B को 300 मीटर तथा C को 600 मीटर की बढ़त देता है। A, B से 30 सेकंड और C से 60 सेकंड पहले दौड़ समाप्त करता है। यदि A की गति 10 मी/से है, तो B और C की गति क्रमशः ज्ञात करें।",
      "optE": [
        "7.5 m/s, 2.5 m/s",
        "6 m/s, 3.3 m/s",
        "5.5 m/s, 3 m/s",
        "8.5 m/s, 5 m/s"
      ],
      "optH": [
        "7.5 मी/से, 2.5 मी/से",
        "6 मी/से, 3.3 मी/से",
        "5.5 मी/से, 3 मी/से",
        "8.5 मी/से, 5 मी/से"
      ],
      "ans": 1,
      "solE": "A takes 120 seconds. B runs 900 m in 150 seconds, so speed=900/150=6 m/s. C runs 600 m in 180 seconds, so speed=600/180=3.33 m/s.",
      "solH": "A को 120 सेकंड लगते हैं। B, 900 मीटर को 150 सेकंड में पूरा करता है, अतः उसकी गति 6 मी/से है। C, 600 मीटर को 180 सेकंड में पूरा करता है, अतः उसकी गति 3.33 मी/से है।"
    },
    {
      "id": 5,
      "eng": "In a circular race of 1850 m, Aman and Suman start together from the same point with speeds of 22 km/h and 15 km/h respectively. After how many seconds will they meet for the first time while running in opposite directions?",
      "hin": "1850 मीटर की वृत्ताकार दौड़ में अमन और सुमन एक ही बिंदु से क्रमशः 22 किमी/घंटा और 15 किमी/घंटा की गति से विपरीत दिशाओं में दौड़ते हैं। वे पहली बार कितने सेकंड बाद मिलेंगे?",
      "optE": [
        "189 seconds",
        "170 seconds",
        "180 seconds",
        "172 seconds"
      ],
      "optH": [
        "189 सेकंड",
        "170 सेकंड",
        "180 सेकंड",
        "172 सेकंड"
      ],
      "ans": 2,
      "solE": "Relative speed =22+15=37 km/h = 185/18 m/s. Time =1850 ÷ (185/18)=180 seconds.",
      "solH": "सापेक्ष गति =22+15=37 किमी/घंटा =185/18 मी/से। समय =1850 ÷ (185/18)=180 सेकंड।"
    },
    {
      "id": 6,
      "eng": "A boat can row 36 km downstream in the same time as it rows 24 km upstream. If the speed of the stream is 3 km/h, find the speed of the boat in still water.",
      "hin": "एक नाव 36 किमी धारा की दिशा में उतने ही समय में तय करती है जितने समय में 24 किमी धारा के विपरीत तय करती है। यदि धारा की गति 3 किमी/घंटा है, तो स्थिर जल में नाव की गति ज्ञात करें।",
      "optE": [
        "15 km/h",
        "12 km/h",
        "21 km/h",
        "18 km/h"
      ],
      "optH": [
        "15 किमी/घंटा",
        "12 किमी/घंटा",
        "21 किमी/घंटा",
        "18 किमी/घंटा"
      ],
      "ans": 0,
      "solE": "Let boat speed=x km/h. Then 36/(x+3)=24/(x−3). Solving gives x=15 km/h.",
      "solH": "मान लें स्थिर जल में नाव की गति x किमी/घंटा है। तब 36/(x+3)=24/(x−3)। हल करने पर x=15 किमी/घंटा प्राप्त होता है।"
    },
    {
      "id": 7,
      "eng": "A motorboat has a speed of 25 km/h in still water. It takes 4 hours to cover 80 km upstream. Find the total time required to travel the same distance upstream and then downstream.",
      "hin": "एक मोटरबोट की स्थिर जल में गति 25 किमी/घंटा है। वह 80 किमी धारा के विपरीत 4 घंटे में तय करती है। उसी दूरी को पहले धारा के विपरीत और फिर धारा की दिशा में तय करने में कुल कितना समय लगेगा?",
      "optE": [
        "5 hours 30 minutes",
        "6 hours 40 minutes",
        "6 hours 20 minutes",
        "5 hours 42 minutes"
      ],
      "optH": [
        "5 घंटे 30 मिनट",
        "6 घंटे 40 मिनट",
        "6 घंटे 20 मिनट",
        "5 घंटे 42 मिनट"
      ],
      "ans": 1,
      "solE": "Upstream speed=80/4=20 km/h, so stream speed=5 km/h. Downstream speed=30 km/h. Total time=80/20+80/30=4+2⅔=6 hours 40 minutes.",
      "solH": "धारा के विपरीत गति 20 किमी/घंटा है, इसलिए धारा की गति 5 किमी/घंटा होगी। धारा की दिशा में गति 30 किमी/घंटा होगी। कुल समय=4+2⅔=6 घंटे 40 मिनट।"
    },
    {
      "id": 8,
      "eng": "If a boat travels at 12 km/h in still water and the speed of the stream is 3 km/h, how much time will it take to travel 60 km downstream?",
      "hin": "यदि स्थिर जल में नाव की गति 12 किमी/घंटा तथा धारा की गति 3 किमी/घंटा है, तो 60 किमी धारा की दिशा में जाने में कितना समय लगेगा?",
      "optE": [
        "4 hours",
        "9 hours",
        "5 hours",
        "6 hours"
      ],
      "optH": [
        "4 घंटे",
        "9 घंटे",
        "5 घंटे",
        "6 घंटे"
      ],
      "ans": 0,
      "solE": "Downstream speed=12+3=15 km/h. Time=60/15=4 hours.",
      "solH": "धारा की दिशा में नाव की गति =12+3=15 किमी/घंटा होगी। समय=60/15=4 घंटे।"
    },
    {
      "id": 9,
      "eng": "A boat moves at a speed of 7 km/h in still water. The boat goes 40 km downstream and then 40 km upstream. It is observed that the total time taken for this journey is 560 minutes less than the time it would take if the speed of the stream were 2 km/h faster. What is the initial speed of the stream?",
      "hin": "एक नाव की स्थिर जल में गति 7 किमी/घंटा है। नाव 40 किमी धारा की दिशा में तथा 40 किमी धारा के विपरीत जाती है। यह देखा गया कि इस यात्रा में लगा कुल समय उस समय से 560 मिनट कम है, जो धारा की गति 2 किमी/घंटा अधिक होने पर लगता। धारा की प्रारम्भिक गति ज्ञात कीजिए।",
      "optE": [
        "3.5 km/h",
        "4.5 km/h",
        "4 km/h",
        "3 km/h"
      ],
      "optH": [
        "3.5 किमी/घंटा",
        "4.5 किमी/घंटा",
        "4 किमी/घंटा",
        "3 किमी/घंटा"
      ],
      "ans": 3,
      "solE": "Let the stream speed be x km/h. Then 40/(7+x)+40/(7−x) − [40/(9+x)+40/(5−x)] = 560/60 = 28/3 hours. Solving gives x = 3 km/h.",
      "solH": "मान लें धारा की गति x किमी/घंटा है। तब 40/(7+x)+40/(7−x) − [40/(9+x)+40/(5−x)] = 560/60 = 28/3 घंटे। हल करने पर x = 3 किमी/घंटा प्राप्त होता है।"
    },
    {
      "id": 10,
      "eng": "A boat travels 120 km downstream in 6 hours and 120 km upstream in 10 hours. The speed of the current is 4 km/h. What is the speed of the boat in still water?",
      "hin": "एक नाव 120 किमी धारा की दिशा में 6 घंटे तथा 120 किमी धारा के विपरीत 10 घंटे में तय करती है। यदि धारा की गति 4 किमी/घंटा है, तो स्थिर जल में नाव की गति ज्ञात कीजिए।",
      "optE": [
        "14 km/h",
        "8 km/h",
        "16 km/h",
        "10 km/h"
      ],
      "optH": [
        "14 किमी/घंटा",
        "8 किमी/घंटा",
        "16 किमी/घंटा",
        "10 किमी/घंटा"
      ],
      "ans": 2,
      "solE": "Downstream speed = 120/6 = 20 km/h and upstream speed = 120/10 = 12 km/h. Boat speed = (20+12)/2 = 16 km/h.",
      "solH": "धारा की दिशा में गति = 120/6 = 20 किमी/घंटा तथा धारा के विपरीत गति = 120/10 = 12 किमी/घंटा। स्थिर जल में नाव की गति = (20+12)/2 = 16 किमी/घंटा।"
    },
    {
      "id": 11,
      "eng": "A boat goes 20,000 m upstream and 44,000 m downstream in 8 hours, while it goes 15,000 m upstream and 22,000 m downstream in 5 hours. Find the speed of the boat in still water.",
      "hin": "एक नाव 20,000 मीटर धारा के विपरीत तथा 44,000 मीटर धारा की दिशा में 8 घंटे में चलती है। वहीं 15,000 मीटर धारा के विपरीत तथा 22,000 मीटर धारा की दिशा में 5 घंटे में चलती है। स्थिर जल में नाव की गति ज्ञात कीजिए।",
      "optE": [
        "19/9 m/s",
        "40/9 m/s",
        "20/9 m/s",
        "29/9 m/s"
      ],
      "optH": [
        "19/9 मी/से",
        "40/9 मी/से",
        "20/9 मी/से",
        "29/9 मी/से"
      ],
      "ans": 2,
      "solE": "Let upstream and downstream speeds be u and d. Form two equations using the given distances and times. Solving gives boat speed = (u+d)/2 = 20/9 m/s.",
      "solH": "मान लें धारा के विपरीत गति u तथा धारा की दिशा में गति d है। दिए गए समय और दूरी से दो समीकरण बनाकर हल करने पर स्थिर जल में नाव की गति (u+d)/2 = 20/9 मी/से प्राप्त होती है।"
    },
    {
      "id": 12,
      "eng": "A boat covers a certain distance downstream in 6 hours and takes 8 hours to return upstream. If the speed of the stream is 4 km/h, find the speed of the boat in still water.",
      "hin": "एक नाव किसी निश्चित दूरी को धारा की दिशा में 6 घंटे तथा उसी दूरी को धारा के विपरीत 8 घंटे में तय करती है। यदि धारा की गति 4 किमी/घंटा है, तो स्थिर जल में नाव की गति ज्ञात कीजिए।",
      "optE": [
        "24 km/h",
        "28 km/h",
        "12 km/h",
        "18 km/h"
      ],
      "optH": [
        "24 किमी/घंटा",
        "28 किमी/घंटा",
        "12 किमी/घंटा",
        "18 किमी/घंटा"
      ],
      "ans": 1,
      "solE": "Let boat speed be x km/h. Equal distances imply 6(x+4)=8(x−4). Solving gives x=28 km/h.",
      "solH": "मान लें स्थिर जल में नाव की गति x किमी/घंटा है। समान दूरी के कारण 6(x+4)=8(x−4)। हल करने पर x=28 किमी/घंटा प्राप्त होता है।"
    },
    {
      "id": 13,
      "eng": "A boat travels 36 km downstream and 24 km upstream in a total of 6 hours. If the speed of the stream is 2 km/h, find the time taken for downstream and upstream journeys respectively.",
      "hin": "एक नाव 36 किमी धारा की दिशा में तथा 24 किमी धारा के विपरीत कुल 6 घंटे में तय करती है। यदि धारा की गति 2 किमी/घंटा है, तो क्रमशः धारा की दिशा तथा धारा के विपरीत लगने वाला समय ज्ञात कीजिए।",
      "optE": [
        "3.0 and 3.0",
        "3.2 and 2.8",
        "3.4 and 2.6",
        "3.6 and 2.4"
      ],
      "optH": [
        "3.0 और 3.0",
        "3.2 और 2.8",
        "3.4 और 2.6",
        "3.6 और 2.4"
      ],
      "ans": 0,
      "solE": "Let the boat speed be x km/h. Using 36/(x+2)+24/(x−2)=6 gives x=10 km/h. Hence times are 36/12=3 hours and 24/8=3 hours.",
      "solH": "मान लें स्थिर जल में नाव की गति x किमी/घंटा है। 36/(x+2)+24/(x−2)=6 से x=10 किमी/घंटा प्राप्त होता है। अतः दोनों यात्राओं में 3-3 घंटे लगते हैं।"
    },
    {
      "id": 14,
      "eng": "A boat takes 8 hours to row 72 km downstream and 12 hours to row the same distance upstream. Find the boat's speed in still water and the speed of the current respectively.",
      "hin": "एक नाव 72 किमी धारा की दिशा में 8 घंटे तथा उसी दूरी को धारा के विपरीत 12 घंटे में तय करती है। क्रमशः स्थिर जल में नाव की गति तथा धारा की गति ज्ञात कीजिए।",
      "optE": [
        "7.5 km/h and 1.5 km/h",
        "8.5 km/h and 2.5 km/h",
        "6.5 km/h and 0.5 km/h",
        "9.5 km/h and 3.5 km/h"
      ],
      "optH": [
        "7.5 किमी/घंटा और 1.5 किमी/घंटा",
        "8.5 किमी/घंटा और 2.5 किमी/घंटा",
        "6.5 किमी/घंटा और 0.5 किमी/घंटा",
        "9.5 किमी/घंटा और 3.5 किमी/घंटा"
      ],
      "ans": 0,
      "solE": "Downstream speed = 72/8 = 9 km/h and upstream speed = 72/12 = 6 km/h. Boat speed = 7.5 km/h and current speed = 1.5 km/h.",
      "solH": "धारा की दिशा में गति = 9 किमी/घंटा तथा धारा के विपरीत गति = 6 किमी/घंटा। अतः स्थिर जल में नाव की गति 7.5 किमी/घंटा तथा धारा की गति 1.5 किमी/घंटा होगी।"
    },
    {
      "id": 15,
      "eng": "Boat A, whose speed in still water is 10 km/h, goes downstream from city P to city Q in 3 hours. Boat B goes from city Q to city P in 5 hours. What is the time taken by Boat B to travel from city P to city Q if the speed of the stream is 5 km/h?",
      "hin": "नाव A की स्थिर जल में गति 10 किमी/घंटा है। वह P से Q तक धारा की दिशा में 3 घंटे में जाती है। नाव B, Q से P तक धारा के विपरीत 5 घंटे में जाती है। यदि धारा की गति 5 किमी/घंटा है, तो नाव B को P से Q तक जाने में कितना समय लगेगा?",
      "optE": [
        "49/15 hours",
        "48/19 hours",
        "45/19 hours",
        "19/45 hours"
      ],
      "optH": [
        "49/15 घंटे",
        "48/19 घंटे",
        "45/19 घंटे",
        "19/45 घंटे"
      ],
      "ans": 2,
      "solE": "Distance PQ = (10+5)×3 = 45 km. Boat B's upstream speed = 45/5 = 9 km/h, so still-water speed = 14 km/h. Downstream speed = 19 km/h. Time = 45/19 hours.",
      "solH": "PQ की दूरी = (10+5)×3 = 45 किमी। नाव B की धारा के विपरीत गति = 45/5 = 9 किमी/घंटा, अतः स्थिर जल में उसकी गति 14 किमी/घंटा होगी। धारा की दिशा में गति 19 किमी/घंटा होगी। समय = 45/19 घंटे।"
    },
    {
      "id": 16,
      "eng": "A boat can row 36 km downstream in the same time as it rows 24 km upstream. If the speed of the stream is 3 km/h, what is the speed of the boat in still water?",
      "hin": "एक नाव 36 किमी धारा की दिशा में उतने ही समय में तय करती है जितने समय में 24 किमी धारा के विपरीत तय करती है। यदि धारा की गति 3 किमी/घंटा है, तो स्थिर जल में नाव की गति ज्ञात कीजिए।",
      "optE": [
        "15 km/h",
        "18 km/h",
        "12 km/h",
        "21 km/h"
      ],
      "optH": [
        "15 किमी/घंटा",
        "18 किमी/घंटा",
        "12 किमी/घंटा",
        "21 किमी/घंटा"
      ],
      "ans": 0,
      "solE": "Let the speed of the boat in still water be x km/h. Then 36/(x+3)=24/(x−3). Solving gives x=15 km/h.",
      "solH": "मान लें स्थिर जल में नाव की गति x किमी/घंटा है। तब 36/(x+3)=24/(x−3)। हल करने पर x=15 किमी/घंटा प्राप्त होता है।"
    },
    {
      "id": 17,
      "eng": "A train travelling at 60 km/h crosses another train travelling in the opposite direction at 84 km/h in 30 seconds. What is the combined length of both the trains?",
      "hin": "60 किमी/घंटा की गति से चल रही एक ट्रेन, 84 किमी/घंटा की गति से विपरीत दिशा में चल रही दूसरी ट्रेन को 30 सेकंड में पार करती है। दोनों ट्रेनों की कुल लंबाई कितनी है?",
      "optE": [
        "1000 m",
        "1300 m",
        "1200 m",
        "1100 m"
      ],
      "optH": [
        "1000 मीटर",
        "1300 मीटर",
        "1200 मीटर",
        "1100 मीटर"
      ],
      "ans": 2,
      "solE": "Relative speed = (60+84) km/h = 144 km/h = 40 m/s. Combined length = 40 × 30 = 1200 m.",
      "solH": "सापेक्ष गति = (60+84)=144 किमी/घंटा = 40 मी/से। कुल लंबाई = 40 × 30 = 1200 मीटर।"
    },
    {
      "id": 18,
      "eng": "Two trains are moving in opposite directions at speeds of 110 km/h and 120 km/h. The length of one train is 450 m. They cross each other in 12 seconds. Find the length of the other train.",
      "hin": "दो ट्रेनें 110 किमी/घंटा और 120 किमी/घंटा की गति से विपरीत दिशाओं में चल रही हैं। एक ट्रेन की लंबाई 450 मीटर है। वे 12 सेकंड में एक-दूसरे को पार करती हैं। दूसरी ट्रेन की लंबाई ज्ञात कीजिए।",
      "optE": [
        "316.67 m",
        "318.7 m",
        "317.34 m",
        "314.28 m"
      ],
      "optH": [
        "316.67 मीटर",
        "318.7 मीटर",
        "317.34 मीटर",
        "314.28 मीटर"
      ],
      "ans": 0,
      "solE": "Relative speed = 230 km/h = 575/9 m/s. Total length = (575/9) × 12 = 766.67 m. Other train = 766.67 − 450 = 316.67 m.",
      "solH": "सापेक्ष गति = 230 किमी/घंटा = 575/9 मी/से। कुल लंबाई = (575/9) × 12 = 766.67 मीटर। दूसरी ट्रेन की लंबाई = 766.67 − 450 = 316.67 मीटर।"
    },
    {
      "id": 19,
      "eng": "Two trains are moving in opposite directions at 140 km/h and 70 km/h. One train is 350 m long. They cross each other in 11 seconds. Find the length of the other train.",
      "hin": "दो ट्रेनें 140 किमी/घंटा और 70 किमी/घंटा की गति से विपरीत दिशाओं में चल रही हैं। एक ट्रेन की लंबाई 350 मीटर है। वे 11 सेकंड में एक-दूसरे को पार करती हैं। दूसरी ट्रेन की लंबाई ज्ञात कीजिए।",
      "optE": [
        "293.51 m",
        "291.67 m",
        "288.08 m",
        "289.34 m"
      ],
      "optH": [
        "293.51 मीटर",
        "291.67 मीटर",
        "288.08 मीटर",
        "289.34 मीटर"
      ],
      "ans": 1,
      "solE": "Relative speed = 210 km/h = 175/3 m/s. Total length = (175/3) × 11 = 641.67 m. Other train = 641.67 − 350 = 291.67 m.",
      "solH": "सापेक्ष गति = 210 किमी/घंटा = 175/3 मी/से। कुल लंबाई = (175/3) × 11 = 641.67 मीटर। दूसरी ट्रेन की लंबाई = 641.67 − 350 = 291.67 मीटर।"
    },
    {
      "id": 20,
      "eng": "Train A is 150 m long and runs at 72 km/h. Train B is 120 m long and runs in the same direction at 54 km/h. How long will Train A take to completely overtake Train B?",
      "hin": "ट्रेन A की लंबाई 150 मीटर है तथा उसकी गति 72 किमी/घंटा है। ट्रेन B की लंबाई 120 मीटर है तथा उसकी गति 54 किमी/घंटा है। ट्रेन A को ट्रेन B को पूरी तरह पार करने में कितना समय लगेगा?",
      "optE": [
        "58 seconds",
        "50 seconds",
        "54 seconds",
        "52 seconds"
      ],
      "optH": [
        "58 सेकंड",
        "50 सेकंड",
        "54 सेकंड",
        "52 सेकंड"
      ],
      "ans": 2,
      "solE": "Relative speed = 72−54 =18 km/h =5 m/s. Total length =150+120=270 m. Time =270/5=54 seconds.",
      "solH": "सापेक्ष गति =72−54=18 किमी/घंटा =5 मी/से। कुल लंबाई =150+120=270 मीटर। समय =270/5=54 सेकंड।"
    },
    {
      "id": 21,
      "eng": "A train travels from P to Q at 144 km/h and returns at a slower speed. If the average speed for the entire journey is 126 km/h, find the return speed.",
      "hin": "एक ट्रेन P से Q तक 144 किमी/घंटा की गति से जाती है तथा वापस कम गति से लौटती है। यदि पूरी यात्रा की औसत गति 126 किमी/घंटा है, तो वापसी की गति ज्ञात कीजिए।",
      "optE": [
        "124 km/h",
        "128 km/h",
        "121 km/h",
        "112 km/h"
      ],
      "optH": [
        "124 किमी/घंटा",
        "128 किमी/घंटा",
        "121 किमी/घंटा",
        "112 किमी/घंटा"
      ],
      "ans": 3,
      "solE": "Average speed = (2ab)/(a+b). Therefore 126 = (2×144×x)/(144+x). Solving gives x =112 km/h.",
      "solH": "औसत गति = (2ab)/(a+b) होती है। अतः 126=(2×144×x)/(144+x)। हल करने पर x=112 किमी/घंटा प्राप्त होता है।"
    },
    {
      "id": 22,
      "eng": "Two trains are moving in opposite directions at 130 km/h and 70 km/h. One train is 130 m long. They cross each other in 14 seconds. Find the length of the other train.",
      "hin": "दो ट्रेनें 130 किमी/घंटा और 70 किमी/घंटा की गति से विपरीत दिशाओं में चल रही हैं। एक ट्रेन की लंबाई 130 मीटर है। वे 14 सेकंड में एक-दूसरे को पार करती हैं। दूसरी ट्रेन की लंबाई ज्ञात कीजिए।",
      "optE": [
        "647.78 m",
        "650.67 m",
        "646.47 m",
        "649.6 m"
      ],
      "optH": [
        "647.78 मीटर",
        "650.67 मीटर",
        "646.47 मीटर",
        "649.6 मीटर"
      ],
      "ans": 0,
      "solE": "Relative speed =200 km/h =500/9 m/s. Total length =(500/9)×14=777.78 m. Other train =777.78−130=647.78 m.",
      "solH": "सापेक्ष गति =200 किमी/घंटा =500/9 मी/से। कुल लंबाई =(500/9)×14=777.78 मीटर। दूसरी ट्रेन =777.78−130=647.78 मीटर।"
    },
    {
      "id": 23,
      "eng": "Two trains move in opposite directions at 90 km/h and 70 km/h. One train is 480 m long. They cross each other in 27 seconds. Find the length of the other train.",
      "hin": "दो ट्रेनें 90 किमी/घंटा और 70 किमी/घंटा की गति से विपरीत दिशाओं में चल रही हैं। एक ट्रेन की लंबाई 480 मीटर है। वे 27 सेकंड में एक-दूसरे को पार करती हैं। दूसरी ट्रेन की लंबाई ज्ञात कीजिए।",
      "optE": [
        "735 m",
        "725 m",
        "730 m",
        "720 m"
      ],
      "optH": [
        "735 मीटर",
        "725 मीटर",
        "730 मीटर",
        "720 मीटर"
      ],
      "ans": 3,
      "solE": "Relative speed =160 km/h =400/9 m/s. Total length =(400/9)×27=1200 m. Other train =1200−480=720 m.",
      "solH": "सापेक्ष गति =160 किमी/घंटा =400/9 मी/से। कुल लंबाई =(400/9)×27=1200 मीटर। दूसरी ट्रेन =1200−480=720 मीटर।"
    },
    {
      "id": 24,
      "eng": "A train of length 120 m travelling at 60 km/h crosses another train travelling in the same direction at 24 km/h in 30 seconds. Find the length of the other train.",
      "hin": "120 मीटर लंबी एक ट्रेन 60 किमी/घंटा की गति से चल रही है। वह 24 किमी/घंटा की गति से उसी दिशा में चल रही दूसरी ट्रेन को 30 सेकंड में पार करती है। दूसरी ट्रेन की लंबाई ज्ञात कीजिए।",
      "optE": [
        "250 m",
        "200 m",
        "225 m",
        "180 m"
      ],
      "optH": [
        "250 मीटर",
        "200 मीटर",
        "225 मीटर",
        "180 मीटर"
      ],
      "ans": 3,
      "solE": "Relative speed =60−24=36 km/h =10 m/s. Total length =10×30=300 m. Other train =300−120=180 m.",
      "solH": "सापेक्ष गति =60−24=36 किमी/घंटा =10 मी/से। कुल लंबाई =10×30=300 मीटर। दूसरी ट्रेन =300−120=180 मीटर।"
    },
    {
      "id": 25,
      "eng": "Two trains are running at 49 km/h and 59 km/h towards each other. Their lengths are 349 m and 371 m respectively. In how many seconds will they completely cross each other?",
      "hin": "दो ट्रेनें 49 किमी/घंटा और 59 किमी/घंटा की गति से एक-दूसरे की ओर चल रही हैं। उनकी लंबाइयाँ क्रमशः 349 मीटर और 371 मीटर हैं। वे एक-दूसरे को पूरी तरह कितने सेकंड में पार करेंगी?",
      "optE": [
        "42 seconds",
        "30 seconds",
        "24 seconds",
        "34 seconds"
      ],
      "optH": [
        "42 सेकंड",
        "30 सेकंड",
        "24 सेकंड",
        "34 सेकंड"
      ],
      "ans": 2,
      "solE": "Relative speed =49+59=108 km/h =30 m/s. Total length =349+371=720 m. Time =720/30=24 seconds.",
      "solH": "सापेक्ष गति =49+59=108 किमी/घंटा =30 मी/से। कुल लंबाई =349+371=720 मीटर। समय =720/30=24 सेकंड।"
    },
    {
      "id": 26,
      "eng": "Two trains running in opposite directions at 40 km/h and 52 km/h cross each other in 18 seconds. If one train is 250 m long, find the length of the other train.",
      "hin": "दो ट्रेनें 40 किमी/घंटा और 52 किमी/घंटा की गति से विपरीत दिशाओं में चल रही हैं। वे 18 सेकंड में एक-दूसरे को पार करती हैं। यदि एक ट्रेन की लंबाई 250 मीटर है, तो दूसरी ट्रेन की लंबाई ज्ञात कीजिए।",
      "optE": [
        "190 m",
        "220 m",
        "200 m",
        "210 m"
      ],
      "optH": [
        "190 मीटर",
        "220 मीटर",
        "200 मीटर",
        "210 मीटर"
      ],
      "ans": 3,
      "solE": "Relative speed =(40+52)=92 km/h =230/9 m/s. Total length =(230/9)×18=460 m. Hence other train =460−250=210 m.",
      "solH": "सापेक्ष गति =(40+52)=92 किमी/घंटा =230/9 मी/से। कुल लंबाई =(230/9)×18=460 मीटर। अतः दूसरी ट्रेन की लंबाई =460−250=210 मीटर।"
    },
    {
      "id": 27,
      "eng": "In a 2295 m circular race, Siddharth finishes one round in 85 seconds and Yash finishes one round in 45 seconds. If they run in opposite directions, how many different meeting points are there on the circumference of the track?",
      "hin": "2295 मीटर की वृत्ताकार दौड़ में सिद्धार्थ एक चक्कर 85 सेकंड में तथा यश एक चक्कर 45 सेकंड में पूरा करता है। यदि दोनों विपरीत दिशाओं में दौड़ते हैं, तो ट्रैक की परिधि पर कुल कितने अलग-अलग मिलने के बिंदु होंगे?",
      "optE": [
        "36",
        "20",
        "26",
        "33"
      ],
      "optH": [
        "36",
        "20",
        "26",
        "33"
      ],
      "ans": 2,
      "solE": "The number of distinct meeting points on a circular track when two runners move in opposite directions is (T₁ + T₂) / GCD(T₁, T₂). Here, T₁ = 85 s and T₂ = 45 s. GCD(85,45) = 5. Therefore, distinct meeting points = (85 + 45)/5 = 130/5 = 26.",
      "solH": "जब दो धावक वृत्ताकार ट्रैक पर विपरीत दिशा में दौड़ते हैं, तो अलग-अलग मिलने के बिंदुओं की संख्या = (T₁ + T₂)/GCD(T₁,T₂) होती है। यहाँ T₁ = 85 सेकंड तथा T₂ = 45 सेकंड हैं। GCD(85,45)=5। अतः मिलने के बिंदुओं की संख्या = (85+45)/5 = 130/5 = 26 होगी।"
    },
    {
      "id": 28,
      "eng": "In a circular race, two runners complete one round in 85 seconds and 45 seconds respectively. If they run in the same direction, how many different meeting points are there on the circumference of the track?",
      "hin": "एक वृत्ताकार दौड़ में दो धावक क्रमशः 85 सेकंड और 45 सेकंड में एक चक्कर पूरा करते हैं। यदि दोनों एक ही दिशा में दौड़ते हैं, तो ट्रैक की परिधि पर कुल कितने अलग-अलग मिलने के बिंदु होंगे?",
      "optE": [
        "26",
        "39",
        "17",
        "9"
      ],
      "optH": [
        "26",
        "39",
        "17",
        "9"
      ],
      "ans": 1,
      "solE": "When two runners move in the same direction, the number of distinct meeting points is T₁ / GCD(T₁, T₂ − T₁) or equivalently the smaller period relation, which gives 39 distinct meeting points for T₁ = 85 s and T₂ = 45 s.",
      "solH": "जब दो धावक एक ही दिशा में दौड़ते हैं, तो मिलने के अलग-अलग बिंदुओं की संख्या समयों के अंतर पर आधारित होती है। T₁ = 85 सेकंड तथा T₂ = 45 सेकंड के लिए गणना करने पर कुल 39 अलग-अलग मिलने के बिंदु प्राप्त होते हैं।"
    },
    {
      "id": 29,
      "eng": "A policeman sees a chain snatcher at a distance of 50 m. He starts chasing the chain snatcher, who is running at a speed of 2 m/s, while the policeman runs at a speed of 4 m/s. Find the distance covered by the chain snatcher before he is caught.",
      "hin": "एक पुलिसकर्मी 50 मीटर की दूरी पर एक चेन स्नैचर को देखता है। वह उसका पीछा करना शुरू करता है। चेन स्नैचर की गति 2 मी/से तथा पुलिसकर्मी की गति 4 मी/से है। पकड़े जाने से पहले चेन स्नैचर द्वारा तय की गई दूरी ज्ञात कीजिए।",
      "optE": [
        "25 m",
        "50 m",
        "75 m",
        "100 m"
      ],
      "optH": [
        "25 मीटर",
        "50 मीटर",
        "75 मीटर",
        "100 मीटर"
      ],
      "ans": 1,
      "solE": "Initial distance = 50 m. Relative speed = 4 − 2 = 2 m/s. Time taken to catch = 50/2 = 25 s. Distance covered by the chain snatcher = 2 × 25 = 50 m.",
      "solH": "प्रारम्भिक दूरी = 50 मीटर। सापेक्ष गति = 4 − 2 = 2 मी/से। पकड़ने में समय = 50/2 = 25 सेकंड। इस दौरान चेन स्नैचर द्वारा तय दूरी = 2 × 25 = 50 मीटर।"
    },
    {
      "id": 30,
      "eng": "A boy walking at a speed of 20 km/h reaches his school 30 minutes late. The next day he increases his speed by 4 km/h but is still 10 minutes late. Find the distance between his home and the school.",
      "hin": "एक लड़का 20 किमी/घंटा की गति से चलने पर अपने विद्यालय 30 मिनट देर से पहुँचता है। अगली बार वह अपनी गति 4 किमी/घंटा बढ़ा देता है, फिर भी 10 मिनट देर से पहुँचता है। उसके घर और विद्यालय के बीच की दूरी ज्ञात कीजिए।",
      "optE": [
        "30 km",
        "36 km",
        "40 km",
        "48 km"
      ],
      "optH": [
        "30 किमी",
        "36 किमी",
        "40 किमी",
        "48 किमी"
      ],
      "ans": 2,
      "solE": "Let the distance be D km. Difference in travel times = 30 − 10 = 20 minutes = 1/3 hour. Therefore, D/20 − D/24 = 1/3. Solving gives D(1/120) = 1/3, hence D = 40 km.",
      "solH": "मान लें दूरी D किमी है। दोनों यात्राओं के समय का अंतर = 30 − 10 = 20 मिनट = 1/3 घंटा। अतः D/20 − D/24 = 1/3। हल करने पर D/120 = 1/3, इसलिए D = 40 किमी।"
    }
  ]
};
