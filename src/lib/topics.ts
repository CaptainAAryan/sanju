export interface SubTopic { title: string; preview: string; detail: string; }
export interface Topic { key: string; icon: string; gradient: string; color: string; title: string; desc: string; subtopics: SubTopic[]; }

const s = (title:string, preview:string, detail:string): SubTopic => ({title, preview, detail});
const t = (key:string, icon:string, gradient:string, color:string, title:string, desc:string, subtopics:SubTopic[]):Topic => ({key,icon,gradient,color,title,desc,subtopics});

export const TOPICS: Topic[] = [
  t("nutrition","🥗","bg-gradient-nutrition","nutrition","Nutrition & Malnutrition","Healthy eating, hydration and malnutrition awareness",[
    s("Balanced Diet","Building healthy meals","Learn the basics of a balanced diet with grains, vegetables, fruits, protein sources and healthy fats."),
    s("Child Nutrition","Helping children grow","Understand healthy meals, feeding routines, growth and when a child may need extra support."),
    s("Iron & Anaemia","Understanding iron","Learn about iron-rich foods, factors affecting absorption and when persistent symptoms should be checked."),
    s("Protein & Growth","Why protein matters","Explore affordable protein sources and how protein supports growth, repair and everyday body functions."),
    s("Vitamins & Minerals","Essential nutrients","Learn what common vitamins and minerals do, where they come from and why supplements need care."),
    s("Hydration","Keeping the body hydrated","Learn everyday hydration, signs of dehydration and why fluid needs can rise during heat or illness."),
    s("Malnutrition","Recognising nutrition problems","Understand undernutrition, micronutrient deficiency and excess weight as different nutrition concerns."),
    s("Food Safety","Safer food and water","Learn simple habits for clean hands, safe drinking water, food storage and preventing contamination.")
  ]),
  t("womens-health","🌸","bg-gradient-menstrual","menstrual","Women's Health","Menstrual, reproductive, hormonal and everyday women's health",[
    s("Menstrual Health","Cycles, periods and hygiene","Learn about menstrual cycles, period hygiene, common symptoms and when changes should be checked."),
    s("Period Pain","Understanding cramps","Explore common causes of period pain, comfort measures and signs that need medical evaluation."),
    s("Irregular Periods","Why cycles can change","Learn common reasons periods become irregular and when persistent changes deserve a consultation."),
    s("PCOS Awareness","Understanding PCOS","Learn what PCOS is, common features and why symptoms can differ from person to person."),
    s("Breast Health","Knowing what is normal","Learn about breast awareness, common changes and when a new or persistent change should be assessed."),
    s("Menopause","Changes later in life","Learn about common menopause symptoms, healthy habits and when symptoms should be discussed."),
    s("Women's Hygiene","Everyday hygiene basics","Simple guidance on menstrual hygiene, intimate-area care, clean water and avoiding irritation.")
  ]),
  t("child-health","👶","bg-gradient-pregnancy","pregnancy","Child Health","Growth, development, hygiene, nutrition and childhood concerns",[
    s("Growth & Development","Understanding milestones","Learn about broad childhood growth and development and why every child develops at their own pace."),
    s("Child Nutrition","Healthy growth through food","Explore balanced meals, feeding routines, hydration and nutrition needs across childhood."),
    s("Vaccination","Protecting children","Understand routine vaccination and how to keep a child's immunisation record organised."),
    s("Newborn Care","The first weeks","Learn basic newborn care, feeding, warmth, hygiene and warning signs requiring prompt attention."),
    s("Child Hygiene","Healthy daily habits","Learn handwashing, dental care, bathing, safe water and sanitation habits for children."),
    s("Fever & Common Illness","When a child feels unwell","Learn what to monitor during common illnesses and which warning signs need prompt assessment."),
    s("Child Safety","Preventing injuries","Practical awareness around safe water, medicines, household hazards, roads and supervision.")
  ]),
  t("pregnancy-maternal","🤰","bg-gradient-pregnancy","pregnancy","Pregnancy & Maternal Care","Pregnancy awareness, antenatal care, birth and postnatal wellbeing",[
    s("Early Pregnancy","After a positive test","Learn why confirming pregnancy, starting antenatal care early and reviewing medicines matters."),
    s("Antenatal Care","Regular check-ups","Understand why antenatal visits, screening, nutrition and monitoring are important."),
    s("Pregnancy Nutrition","Food and nutrients","Learn about balanced meals, iron, folate, calcium, protein and hydration during pregnancy."),
    s("Pregnancy Warning Signs","When urgent care matters","Learn about warning symptoms during pregnancy that should not be ignored."),
    s("Birth Planning","Preparing for delivery","Plan where to seek care, transport, documents, support people and emergency contacts."),
    s("Postnatal Care","Care after birth","Learn about recovery, nutrition, breastfeeding support, newborn care and concerning symptoms."),
    s("Maternal Mental Wellbeing","Emotional health after birth","Understand emotional changes after childbirth and when persistent distress needs support.")
  ]),
  t("vaccination","💉","bg-gradient-vaccine","vaccine","Vaccination & Immunization","Routine vaccines, catch-up care, myths and vaccine safety",[
    s("Why Vaccines Matter","Preventing serious disease","Learn how vaccines train the immune system and reduce serious vaccine-preventable disease."),
    s("Routine Immunization","Keeping up with schedules","Understand why schedules use specific ages and why records should stay updated."),
    s("Missed Vaccines","Catch-up care","Learn why a missed dose does not usually mean starting over and how health workers help."),
    s("Vaccine Side Effects","What can be expected","Learn about common mild reactions and when unusual symptoms need professional assessment."),
    s("Pregnancy & Vaccines","Maternal immunization","Learn why some vaccines are recommended during pregnancy and why choices should be discussed with a professional."),
    s("Vaccine Myths","Facts over rumours","Explore common misconceptions and how to check claims against reliable public-health sources."),
    s("Immunization Records","Keep doses organised","Learn how to keep paper or digital records updated and bring them to health visits.")
  ]),
  t("common-illness","🦠","bg-gradient-emergency","emergency","Common Illnesses","Everyday health problems, symptoms, prevention and when to seek care",[
    s("Fever","Understanding a common symptom","Learn what fever means, what to monitor and which accompanying symptoms need assessment."),
    s("Cold & Cough","Common respiratory symptoms","Learn common causes, supportive care and warning signs that need medical attention."),
    s("Diarrhoea","Protecting against dehydration","Learn why fluids matter, how to recognise dehydration and when symptoms need care."),
    s("Vomiting","What to monitor","Learn about hydration, monitoring and warning signs such as inability to keep fluids down."),
    s("Headache","Common causes and red flags","Explore common triggers and learn which sudden, severe or unusual headaches need evaluation."),
    s("Allergies","Understanding allergic symptoms","Learn about common triggers and why breathing difficulty or severe swelling needs urgent help."),
    s("When to See a Doctor","Knowing when symptoms matter","Learn how severity, duration, worsening symptoms and warning signs guide decisions about professional care.")
  ]),
  t("mental-wellbeing","🧠","bg-gradient-schemes","schemes","Mental Wellbeing","Stress, sleep, emotions, resilience and finding support",[
    s("Stress","Understanding everyday stress","Learn what stress can feel like, how routines and support can help, and when ongoing stress needs support."),
    s("Sleep","Healthier sleep habits","Explore regular routines, screen habits, relaxation and when persistent sleep problems need attention."),
    s("Anxiety","Understanding anxious feelings","Learn how anxiety can affect thoughts and the body, plus healthy ways to seek support."),
    s("Low Mood","When sadness lasts","Learn about persistent low mood and when talking to a trusted person or professional can help."),
    s("Young People's Wellbeing","School, friends and pressure","Explore healthy coping, supportive relationships, school pressure and ways to ask for help."),
    s("Healthy Relationships","Respect and support","Learn about communication, boundaries, respect and recognising when a relationship feels unsafe."),
    s("When to Seek Support","You do not have to manage alone","Learn when emotional difficulties interfere with daily life and how to reach trusted support.")
  ]),
  t("heart-blood","❤️","bg-gradient-menstrual","menstrual","Heart & Blood Health","Blood pressure, cholesterol, anaemia and heart-health awareness",[
    s("Blood Pressure","Why checks matter","Learn what blood pressure measures and why high blood pressure can be silent."),
    s("Heart Health","Protecting your heart","Learn about healthy eating, activity, sleep, avoiding tobacco and regular checks."),
    s("Cholesterol","Understanding blood fats","Learn what cholesterol is and how lifestyle and professional care can affect heart health."),
    s("Anaemia","Low haemoglobin awareness","Learn common causes, possible symptoms and why testing can identify the cause."),
    s("Healthy Activity","Moving for health","Learn how age-appropriate physical activity supports cardiovascular health and wellbeing."),
    s("Heart Warning Signs","Recognising urgent symptoms","Learn which sudden symptoms can require urgent medical attention.")
  ]),
  t("respiratory-health","🫁","bg-gradient-vaccine","vaccine","Respiratory Health","Breathing, asthma, infections and lung-health awareness",[
    s("Breathing Health","Keeping lungs healthy","Learn about clean air, avoiding tobacco smoke and recognising changes in breathing."),
    s("Asthma Awareness","Understanding asthma","Learn what asthma is, common triggers and why an individual plan from a professional matters."),
    s("Cough","A common symptom","Learn common causes of cough and which persistent or unusual symptoms need evaluation."),
    s("Respiratory Infections","Reducing spread","Learn about hand hygiene, ventilation, staying home when unwell and when to seek advice."),
    s("Air Pollution","Protecting yourself","Learn how poor air quality can affect breathing and ways to reduce exposure."),
    s("Tuberculosis Awareness","Know the warning signs","Learn why persistent symptoms should be assessed and why completing professional treatment matters."),
    s("Emergency Breathing Problems","When breathing is difficult","Severe breathing difficulty can be an emergency; learn to recognise it and seek urgent help.")
  ]),
  t("dental-oral","🦷","bg-gradient-nutrition","nutrition","Dental & Oral Health","Teeth, gums, oral hygiene and prevention",[
    s("Brushing Basics","Everyday tooth care","Learn why regular brushing with fluoride toothpaste helps prevent decay and gum disease."),
    s("Gum Health","Healthy gums matter","Learn about gum inflammation and why persistent bleeding or swelling should be checked."),
    s("Tooth Decay","Preventing cavities","Understand how frequent sugary foods and poor oral hygiene can contribute to decay."),
    s("Children's Dental Health","Starting early","Learn how to build healthy dental routines for children and why early care matters."),
    s("Mouth Ulcers","Common oral discomfort","Learn common causes and when persistent or unusual ulcers need assessment."),
    s("Tobacco & Oral Health","Know the risks","Learn why smoking and smokeless tobacco can seriously harm oral and overall health."),
    s("Dental Check-ups","Prevention beats pain","Learn why periodic dental check-ups can identify problems before they become complicated.")
  ]),
  t("eye-vision","👁️","bg-gradient-schemes","schemes","Eye & Vision Health","Vision, eye hygiene, screen habits and common concerns",[
    s("Vision Checks","Know your eyesight","Learn why regular vision checks can identify problems early."),
    s("Screen & Eye Strain","Comfort during screen use","Learn about breaks, viewing distance, lighting and when persistent symptoms need an eye exam."),
    s("Children's Vision","Spotting changes early","Learn signs that a child may have difficulty seeing and why early assessment supports learning."),
    s("Eye Hygiene","Keeping eyes healthy","Learn simple hygiene habits and why clean hands matter around the eyes."),
    s("Red Eyes","Common causes","Learn about common reasons eyes become red and which symptoms require prompt assessment."),
    s("Contact Lens Safety","Safer lens habits","Learn why proper cleaning, storage and replacement matter and why lenses should not be shared."),
    s("Sudden Vision Changes","When urgent care matters","Sudden loss or major change in vision should be assessed promptly.")
  ]),
  t("bones-joints","🦴","bg-gradient-pregnancy","pregnancy","Bones, Joints & Physical Health","Movement, posture, injuries, bone health and mobility",[
    s("Bone Health","Building strong bones","Learn how nutrition, physical activity and age-appropriate care support bone health."),
    s("Joint Pain","Understanding common causes","Learn about common causes of joint pain and when ongoing or severe symptoms need assessment."),
    s("Back & Neck Health","Everyday movement habits","Learn about posture, movement breaks and safe activity habits."),
    s("Sports & Activity","Staying active safely","Learn about warm-ups, gradual progression, hydration and listening to your body."),
    s("Minor Injuries","What to monitor","Learn basic awareness for minor strains and when an injury needs professional assessment."),
    s("Falls Prevention","Reducing injury risk","Explore home and community safety measures that can reduce falls."),
    s("Mobility & Rehabilitation","Supporting movement","Learn about mobility support and why persistent movement limitations deserve assessment.")
  ]),
  t("skin-hygiene","🧴","bg-gradient-menstrual","menstrual","Skin & Personal Hygiene","Skin care, bathing, hand hygiene, sanitation and prevention",[
    s("Hand Hygiene","One of the best protections","Learn when and how proper handwashing helps reduce the spread of infection."),
    s("Skin Care Basics","Healthy everyday skin","Learn gentle cleansing, sun protection, hydration and why harsh products can irritate skin."),
    s("Acne","Common skin changes","Learn why acne happens, simple skin-care habits and when persistent acne deserves care."),
    s("Rashes","Understanding skin changes","Learn common causes and why rapidly spreading, severe or unusual rashes need assessment."),
    s("Sun Protection","Protecting your skin","Learn about shade, clothing and sunscreen to reduce excessive UV exposure."),
    s("Personal Hygiene","Daily habits that matter","Learn about bathing, clean clothes, oral care, menstrual hygiene and sanitation."),
    s("Water & Sanitation","Health starts with basics","Learn how safe water, toilets, waste disposal and clean surroundings prevent disease.")
  ]),
  t("disability-rehab","🧑‍🦽","bg-gradient-vaccine","vaccine","Disability & Rehabilitation","Accessibility, rehabilitation, assistive support and inclusion",[
    s("Understanding Disability","Different kinds of disability","Learn about physical, sensory, intellectual and psychosocial disabilities and why inclusion matters."),
    s("Early Support","Getting help sooner","Learn why early assessment and appropriate support can improve participation and development."),
    s("Rehabilitation","Supporting independence","Understand how physiotherapy, occupational therapy, speech therapy and other services can help."),
    s("Assistive Devices","Tools that improve access","Learn about mobility, communication and other assistive devices and professional fitting."),
    s("Accessible Healthcare","Everyone deserves care","Learn how accessible communication, facilities and respectful care improve access."),
    s("Child Development Support","Supporting children","Learn why developmental concerns should be assessed early."),
    s("Community Inclusion","Participation matters","Explore ways families, schools and communities can make participation easier.")
  ]),
  t("others","➕","bg-gradient-schemes","schemes","Others","Other health questions and topics that do not fit one care area",[
    s("Ask Sanju Anything","Start with your question","Ask Sanju about a health topic and get simple information, possible next steps and guidance on when to seek professional care."),
    s("First Aid Awareness","Basic emergency awareness","Learn general first-aid principles and when to contact emergency services. Sanju is not a substitute for trained emergency care."),
    s("Medicines & Prescriptions","Understand, don't guess","Ask what a medicine is generally used for and what questions to discuss with a pharmacist or doctor. Do not change prescribed treatment based only on AI advice."),
    s("Health Tests","Understanding common tests","Learn what common tests are designed to measure and what questions to ask your healthcare professional."),
    s("Healthy Lifestyle","Small habits, long-term benefits","Explore sleep, activity, nutrition, hydration, hygiene and avoiding tobacco as foundations of health."),
    s("Health Misinformation","Check before you trust","Learn how to identify unreliable health claims and compare them with trusted public-health or professional sources."),
    s("Community Health","Health beyond the home","Explore sanitation, vaccination, nutrition awareness, community health workers and healthier communities."),
    s("Find the Right Care","Who should I talk to?","Learn when a pharmacist, nurse, primary-care professional, specialist or emergency service may be appropriate.")
  ])
];

export const EMERGENCY_KEYWORDS = [
  "chest pain", "severe bleeding", "unconscious", "cannot breathe", "can't breathe",
  "seizure", "stroke", "heart attack", "baby not moving",
  "सीने में दर्द", "बेहोश", "साँस नहीं", "दौरा",
  "বুকে ব্যথা", "অজ্ঞান", "শ্বাস",
];

export function detectEmergency(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((k) => lower.includes(k.toLowerCase()));
}
