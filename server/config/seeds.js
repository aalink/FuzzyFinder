const db = require('./connection');
const { User, Dog, Category } = require('../models');

db.once('open', async () => {

  await User.deleteMany();

  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Guide Dogs' },
    { name: 'Hearing Dogs' },
    { name: 'Diabetic Alert Dogs' },
    { name: 'Mobility Assistance Dogs' },
    { name: 'Seizure Support Dogs' },
    { name: 'Autism Support Dogs' },
    { name: 'Severe Allergy Detection Dogs' },
    { name: 'Psychiatric Service Dogs' },
    { name: 'Visual Assistance Dogs' },
    { name: 'Emotional Support Dogs' },
  ]);

  console.log('categories seeded');

try{
  await User.create([{
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    userType: 'owner'
  },
  {
    firstName: 'Hector',
    lastName: 'Farias',
    email: 'Hector@testmail.com',
    password: 'password12345',
    userType: 'owner'
  },
  {
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    userType: 'patient'
  },
  {
    firstName: 'Lucy',
    lastName: 'Lu',
    email: 'l.lu@testmail.com',
    password: 'password12345',
    userType: 'owner'
  },
  {
    firstName: 'Ma',
    lastName: 'Donna',
    email: 'madonna@testmail.com',
    password: 'password12345',
    userType: 'patient'
  }]);
} catch (error) {
  console.log(error);
}

  console.log('users seeded');

const userIds = await User.find({userType: 'owner'});
// console.log(userIds);
  await Dog.deleteMany();

  const dogs = await Dog.insertMany([
    
    {
      name: 'Pepper',
      description: 'hi, I\'m Pepper, a trained diabetic alert dog. I can sense the blood sugar level of a person and alert them before it becomes too dangerous. In addition, I\'m a good boy and would love to play and comfort you when you\'re in need. ',
      image: '1-dog-black-and-white.jpg',
      rate: 8,
      zipCode: 30005,
      category: categories[2]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Marky',
      description: 'hi, my name is Marky. According to my owner, I\'m super smart, gentle, and I LOVE kisses. I\'ll be your perfect cuddle dog if you let me',
      image: '2-dog-mikey-mouse-ears.jpg',
      rate: 10,
      zipCode: 30008,
      category: categories[9]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Ricky',
      description: 'hi, I\'m Ricky, I\'m super playful, curious, and athletic. I\'m mobility assistant and can help people with their moving from place ot place. ',
      image: '3-boxer-mix.jpg',
      rate: 8,
      zipCode: 30023,
      category: categories[3]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Danny',
      description: 'Hi, I\'m Danny, I\'m a super special Chihuahua as there are not many Chihuahuas do what I can do. I\'m a PSD dog, or psychiatric service dog. I work with people with certain disabilities and help them live their lives. I think I\'m a big helper!',
      image: '4-chihuahua.jpg',
      rate: 10,
      zipCode: 30023,
      category: categories[7]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },

    {
      name: 'Terry',
      description: 'Hey, this is Terry. I\'m gentle, alert and independent. I\'m a seizure alert dog, trained to work with people with epilepsy. If you need my help, feel free to contact my owner. ',
      image: '5-english-cocker-spaniel.jpg',
      rate:8,
      zipCode: 30023,
      category: categories[4]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Mikey',
      description: 'Hi, I\'m Mikey, I\'m a friendly, playful and active emotional support dog. I love a good cuddle!',
      image: '6-dog-brown.jpg',
      rate: 10,
      zipCode: 30077,
      category: categories[9]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Davey',
      description: 'hi, I\'m Davey, I\'m a super sweet dog. Though I\'m active, I love snuggles too. I\'m a trained emotional support dog, and love playing with kids. ',
      image: '7-australian-shepherd.jpg',
      rate: 8,
      zipCode: 30077,
      category: categories[9]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Timmy',
      description: 'Hi, this is Timmy. As a trained psychiatric service dogs, I work with people who have epilepsy, alert them when I sense something abnormal. I\'m a great helper. I\'m also very active and sweet. Hope to help you with your life! ',
      image: '8-dog-playful.jpg',
      rate: 10,
      zipCode: 30077,
      category: categories[7]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Tommy',
      description: 'Hi, this is Tommy, I\'m a sweet doberman, and also a trained mobility assistant for people in wheelchairs or have mobility problems. I\'m super energetic so I can take care of you throughout the day! ',
      image: '9-doberman.jpg',
      rate: 10,
      zipCode: 30077,
      category: categories[3]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Joey',
      description: 'Hi, this is Joey, not a baby Kangaroo, but a nice poodle dog! I\'m a seizure support dog as I can sense the body chemical change and alert my partner right away. ',
      image: '10-poodle.jpg',
      rate: 10,
      zipCode: 30097,
      category: categories[4]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Robby',
      description: 'Hi, this is playful Robby. I\'m a trained guide dog for people with vision impairment. I\'m diligent and hard-working. If you need my help, feel free to ask my owner for an appointment.',
      image: '11-dog-blackbrownmix.jpg',
      rate: 10,
      zipCode: 30097,
      category: categories[0]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Johnny',
      description: 'Hi, I\'m Johnny, a brave and sensitive German longhaired pointer dog. I\'m trained as an allegy detector. I can scan the environment for traces of nuts, and other allegy factors. This way, I can help keep you safe!',
      image: '12-german-longhaired-pointer.jpg',
      rate: 15,
      zipCode: 30097,
      category: categories[6]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Brian',
      description: 'Hi, I\'m Brian, a trained guide dog. I help blind or vision impaired people to live an independant life. If you need my help temporarily, feel free to contact my owner. ',
      image: '13-continental-bulldog.jpg',
      rate: 10,
      zipCode: 30097,
      category: categories[0]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Willy',
      description: 'Hi, do you like 101 Dalmation? That\'s my favorite movie! I\'m a dalmation too, my name is Willy! I work with autistic kids and help them learn different tasks. Eventually, I become their best friends. I like working with diifferent kids, as I feel I can offer more help this way! ',
      image: '14-dalmatian.jpg',
      rate: 15,
      zipCode: 30026,
      category: categories[5]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Minnie',
      description: 'Hi, want a gentle, loving and happy dog for a cuddle? Choose me! I\'m Minnie, I\'ll be your favorite cuddle dog! ',
      image: '15-labrador-2.jpg',
      rate: 10,
      zipCode: 30026,
      category: categories[9]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Robin',
      description: 'A loving friend ready to helpHey, this is Robin, a trained autism support dog! I work with people in need with social communication, helping them adapt to a new environment, understand danger and keep them calm. ',
      image: '16-labrador-1.jpg',
      rate: 10,
      zipCode: 30087,
      category: categories[5]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Jan',
      description: 'Hi, I\'m Jan, not Jon, but Jan! I specialized in detecting diabetic shock as I can sense the change of people\'s blood sugar. Hopefully I can help you to get back on your feet and stay safe all the time. ',
      image: '17-weimaraner.jpg',
      rate: 10,
      zipCode: 30087,
      category: categories[2]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Franky',
      description: 'Hi, I\'m a pretty Jack Russell dog named Franky, I help people with vision loss to get familiar with their environment, alert them when there\'s danger or hazard nearby. And I\'m also sweet, happy and hard-working! ',
      image: '18-jack-russell.jpg',
      rate: 8,
      zipCode: 30087,
      category: categories[8]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Brady',
      description: 'Hi, the name is Brady! I\'m a trained allergy detector, I love my job, as I get to smell peanuts all the time. Of course I get to eat it too!!! Oh, oh, I never forget to alert my partner there are NUTS in the environment!!!',
      image: '19-bulldog.jpg',
      rate: 10,
      zipCode: 30087,
      category: categories[6]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Demi',
      description: 'Hi, I\'m Demi, a happy Australian shepherd. As a trained visual asistant, I help people with vision loss and guide them along streets and through public spaces. They feel safer when I\'m around. ',
      image: '20-australian-shepherd.jpg',
      rate: 10,
      zipCode: 30087,
      category: categories[8]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Luna',
      description: 'Hi, I\'m Luna, a 2-year-old black labrador. I\'m professionally trained as a guide dog, I have great memory, pay attention to the surroundings. I\'m willing to learn your environment and help you concentrate. I\'m also a sweet, playful girl, love playing gently with seniors or kids.',
      image: '21-black-lab.jpg',
      rate:5,
      zipCode: 30004,
      category: categories[0]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Marley',
      description: 'Hello there, my name is Marley, what a great name, huh? I\'m trained to be super sensitive to sounds, such as doorbells, timers, smoke alarms, babies\' cries, alarm clocks, etc. When I hear something dangerous, I will give you a snug or pat. Hope this will help you!',
      image: '22-brown-vizsla.jpg',
      rate:8,
      zipCode: 30009,
      category: categories[1]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Tank',
      description: 'Hey, my name is Tank. My super power is to sense your body chemistry and blood sugar level. When I found something suspicious, I\'ll tap on your leg to give you an alert. Am I smart?',
      image: '23-redfox-lab-mix.jpg',
      rate: 5,
      zipCode: 30022,
      category: categories[2]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    },
    {
      name: 'Penny',
      description: 'hi, I\'m Penny, and I\'m super friendly. I\'m a trained hearing dog, keenly alert to environmental sounds. I offer dog cues to my partners they know if there\'s a threat nearby. If you need my support, please feel free to contact my owner. I would love to meet up!',
      image: '24-black-longhair.jpg',
      rate:5,
      zipCode: 30003,
      category: categories[1]._id,
      user: userIds[Math.floor(Math.random()*(userIds.length))]._id
    }
  ]);

  console.log('Dogs seeded');



  process.exit();
});
