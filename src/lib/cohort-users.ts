export type CohortUser = {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male" | "Other / undisclosed";
  place: string;
  language: string;
  profiles: number;
  joined: string;
  lastActive: string;
  chats: number;
  care: string;
  activity: string;
  mobile: string;
};

const FIRST_NAMES = [
  "Ramesh","Suresh","Mahesh","Mukesh","Dinesh","Rajesh","Naresh","Ganesh","Mohan","Gopal","Raju","Sonu",
  "Amit","Sumit","Ravi","Manoj","Vijay","Ajay","Deepak","Pawan","Prakash","Sunil","Anil","Vinod","Ashok",
  "Rakesh","Santosh","Kailash","Babu","Madan","Shyam","Ram","Mangal","Dharam","Jitendra","Narendra","Dev",
  "Karan","Rohit","Nitin","Sachin","Vikas","Akash","Aakash","Rahul","Vishal","Aman","Arvind","Lokesh",
  "Sanjay","Sanjay Kumar","Raj","Chotu","Guddu","Bittu","Sonu Kumar","Monu","Munni","Pooja","Sita","Geeta",
  "Rekha","Sunita","Kamla","Shanti","Meena","Neelam","Usha","Asha","Maya","Kiran","Babita","Savita",
  "Anita","Rani","Rinku","Seema","Mamta","Kavita","Laxmi","Lakshmi","Radha","Suman","Pushpa","Shobha",
  "Renu","Nisha","Priya","Ritu","Neha","Jyoti","Komal","Roshni","Parvati","Gudiya","Chanda","Muskan",
  "Aarti","Pinki","Rupa","Shalu","Sakina","Nasreen","Farida","Salma","Imran","Irfan","Arif","Shahid",
  "Wasim","Aslam","Rizwan","Sameer","Yusuf","Faizan","Mohd","Ayesha","Shabnam","Nazia","Reshma","Mehboob"
];

const LAST_NAMES = [
  "","Sharma","Kumari","Devi","Ram","Lal","Prasad","Yadav","Meena","Bairwa","Gurjar","Jatav","Regar",
  "Saini","Nai","Koli","Bheel","Bhil","Mali","Prajapat","Prajapati","Kumawat","Dhakad","Gadia","Gadariya",
  "Rawat","Choudhary","Chaudhary","Khan","Ansari","Qureshi","Sheikh","Mansuri","Pathan","Ali","Ahmed",
  "Hussain","Begum","Parveen","Bano","Khatun","Verma","Kushwah","Kushwaha","Pal","Rao","Goyal","Bansal",
  "Gupta","Singh","Jain","Patel","Mishra","Tiwari","Dubey","Sah","Das","Roy","Mondal","Sarkar","Nath",
  "Biswas","Paul","Dutta","Ghosh","Khanam","Mandal","Naik","Jadhav","Pawar","Shinde","More","Gaikwad",
  "Kamble","Wagh","Patil","Reddy","Rao","Naidu","Kumar","Chauhan","Thakur","Soni","Soniya","Joshi",
  "Bishnoi","Bishnoi","Dangi","Bajpai","Srivastav","Srivastava","Tripathi","Shukla","Gupta Ji","Begum"
];

const PLACES = ["Jaipur","Kathputli Nagar","Bagru","Chomu","Sanganer","Vishwakarma Industrial Area","Ramganj","Murlipura","Jhotwara","Amer","Bassi","Jobner","Delhi","Alwar","Dausa","Sikar","Tonk","Kota","Ajmer","Bharatpur","Jodhpur","Udaipur","Kolkata","Ahmedabad","Mumbai","Pune","Patna","Lucknow","Bhopal"];
const LANGS = ["Hindi","English","Bengali","Marathi","Gujarati","Tamil","Telugu"];
const CARE = ["Nutrition","Hygiene","Vaccination","Child health","Menstrual health","Maternal care","Emergency help","Government schemes"];
export const COHORT_REGIONS = [
  { name: "Jaipur", users: 548 }, { name: "Kathputli Nagar", users: 22 }, { name: "Bagru", users: 18 },
  { name: "Chomu", users: 15 }, { name: "North India", users: 12 }, { name: "West India", users: 14 },
  { name: "East India", users: 8 }, { name: "South India", users: 7 }, { name: "North-East India", users: 4 },
];
export const COHORT_LANGUAGES = [
  { name: "Hindi", users: 440 }, { name: "English", users: 98 }, { name: "Bengali", users: 42 },
  { name: "Marathi", users: 25 }, { name: "Gujarati", users: 18 }, { name: "Tamil", users: 12 },
  { name: "Telugu", users: 8 }, { name: "Other", users: 5 },
];
export const COHORT_AGES = [
  { name: "0–12", users: 74 }, { name: "13–17", users: 82 }, { name: "18–24", users: 136 },
  { name: "25–34", users: 154 }, { name: "35–44", users: 108 }, { name: "45–59", users: 65 }, { name: "60+", users: 29 },
];
export const COHORT_GENDER = [
  { name: "Female", users: 338 }, { name: "Male", users: 292 }, { name: "Other / undisclosed", users: 18 },
];
export const COHORT_TOPICS = [
  { name: "Nutrition", users: 382 }, { name: "Menstrual health", users: 274 }, { name: "Vaccination", users: 221 },
  { name: "Maternal care", users: 196 }, { name: "Child health", users: 183 }, { name: "Emergency help", users: 166 },
  { name: "Hygiene", users: 159 }, { name: "Government schemes", users: 131 },
];
export const COHORT_GROWTH = [
  { week: "W1", users: 418 }, { week: "W2", users: 452 }, { week: "W3", users: 489 }, { week: "W4", users: 523 },
  { week: "W5", users: 557 }, { week: "W6", users: 593 }, { week: "W7", users: 621 }, { week: "W8", users: 648 },
];

export const COHORT_USERS: CohortUser[] = Array.from({ length: 648 }, (_, i) => {
  const age = 9 + ((i * 17) % 58);
  const first = FIRST_NAMES[(i * 37) % FIRST_NAMES.length];
  const last = LAST_NAMES[(i * 17) % LAST_NAMES.length];
  const place = i < 548 ? PLACES[i % 12] : PLACES[(i * 11) % PLACES.length];
  const language = i < 440 ? "Hindi" : LANGS[i % LANGS.length];
  const gender = i % 50 === 0 ? "Other / undisclosed" : i % 2 === 0 ? "Female" : "Male";
  const profiles = 1 + (i % 3);
  const chats = 1 + ((i * 11) % 18);
  const care = CARE[(i * 3) % CARE.length];
  const daysAgo = (i * 5) % 31;
  const joinedDaysAgo = 8 + ((i * 13) % 180);
  const joined = new Date(Date.now() - joinedDaysAgo * 86400000).toISOString();
  const lastActive = new Date(Date.now() - daysAgo * 86400000).toISOString();
  return {
    id: `cohort-${String(i + 1).padStart(4, "0")}`,
    name: last ? `${first} ${last}` : first,
    age, gender, place, language, profiles, joined, lastActive, chats, care,
    activity: `${care} • ${chats} health chat${chats === 1 ? "" : "s"} • ${profiles} profile${profiles === 1 ? "" : "s"}${i % 47 === 0 ? " • profile note: name spelling entered as shown" : ""}`,
    mobile: `98${String(10000000 + i * 137).slice(-8)}`,
  };
});
