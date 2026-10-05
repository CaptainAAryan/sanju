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
  "Sanjay","Sanjay Kumar","Manish","Manish Kumar","Raj","Chotu","Guddu","Bittu","Sonu Kumar","Monu","Munni","Pooja","Sita","Geeta",
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
  "Kamble","Wagh","Patil","Reddy","Rao","Maloo","Naidu","Kumar","Chauhan","Thakur","Soni","Soniya","Joshi",
  "Bishnoi","Bishnoi","Dangi","Bajpai","Srivastav","Srivastava","Tripathi","Shukla","Gupta Ji","Begum"
];

const PLACES = ["Jaipur","Kathputli Nagar","Bagru","Chomu","Sanganer","Delhi","Alwar","Dausa","Sikar","Tonk","Kota"];
const LANGS = ["Hindi","English","Bengali","Marathi","Gujarati","Tamil","Telugu"];
const CARE = ["Nutrition","Hygiene","Vaccination","Child health","Menstrual health","Maternal care","Emergency help","Government schemes"];
export const COHORT_REGIONS = [
  { name: "Jaipur", users: 462 }, { name: "Kathputli Nagar", users: 80 }, { name: "Bagru", users: 18 },
  { name: "Chomu", users: 15 }, { name: "Sanganer", users: 12 }, { name: "Delhi", users: 8 },
  { name: "Kolkata", users: 15 }, { name: "Mumbai", users: 10 }, { name: "Ahmedabad", users: 8 },
  { name: "Hyderabad", users: 7 }, { name: "Chennai", users: 5 }, { name: "Alwar", users: 5 },
  { name: "Dausa", users: 3 },
];
export const COHORT_LANGUAGES = [
  { name: "Hindi", users: 362 }, { name: "English", users: 76 }, { name: "Bengali", users: 142 },
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
  { name: "Nutrition", users: 382 }, { name: "Menstrual health", users: 274 }, { name: "Government schemes", users: 250 },
  { name: "Emergency help", users: 230 }, { name: "Vaccination", users: 221 }, { name: "Maternal care", users: 196 },
  { name: "Child health", users: 183 }, { name: "Hygiene", users: 159 },
];
export const COHORT_GROWTH = [
  { week: "W1", users: 11 }, { week: "W2", users: 29 }, { week: "W3", users: 50 }, { week: "W4", users: 74 },
  { week: "W5", users: 100 }, { week: "W6", users: 120 }, { week: "W7", users: 143 }, { week: "W8", users: 170 },
  { week: "W9", users: 200 }, { week: "W10", users: 230 }, { week: "W11", users: 265 }, { week: "W12", users: 305 },
  { week: "W13", users: 350 }, { week: "W14", users: 400 }, { week: "W15", users: 455 }, { week: "W16", users: 515 },
  { week: "W17", users: 580 }, { week: "W18", users: 648 },
];

export const COHORT_USERS: CohortUser[] = Array.from({ length: 648 }, (_, i) => {
  const age = 9 + ((i * 17) % 58);
  const first = FIRST_NAMES[(i * 37) % FIRST_NAMES.length];
  const last = LAST_NAMES[(i * 17) % LAST_NAMES.length];
  const language = i < 362 ? "Hindi" : i < 438 ? "English" : i < 580 ? "Bengali" : LANGS[(i - 580) % 4 + 3];
  const place =
    language === "Tamil" ? "Chennai" :
    language === "Telugu" ? "Hyderabad" :
    language === "Gujarati" ? "Ahmedabad" :
    language === "Marathi" ? "Mumbai" :
    language === "Bengali" && i % 3 === 0 ? "Kolkata" :
    i < 500 ? "Jaipur" : i < 580 ? "Kathputli Nagar" : PLACES[2 + ((i - 580) % (PLACES.length - 2))];
  const gender = i % 50 === 0 ? "Other / undisclosed" : i % 2 === 0 ? "Female" : "Male";
  const profiles = 1 + (i % 3);
  const chats = 1 + ((i * 7) % 5);
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

export const COHORT_LEADERBOARD = COHORT_USERS.slice().sort((a,b) => b.chats - a.chats).slice(0, 10).map((u, i) => ({ rank: i + 1, name: u.name, chats: u.chats, place: u.place, language: u.language }));
