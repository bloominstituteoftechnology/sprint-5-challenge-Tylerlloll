async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇
  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

  // Task 1: Fetch learners and mentors
  async function fetchLearners() {
    try {
      const learnersResponse = await axios.get('http://localhost:3003/api/learners');
      return learnersResponse.data;
    } catch (error) {
      throw new Error('Error fetching learners:', error);
    }
  }

  async function fetchMentors() {
    try {
      const mentorsResponse = await axios.get('http://localhost:3003/api/mentors');
      return mentorsResponse.data;
    } catch (error) {
      throw new Error('Error fetching mentors:', error);
    }
  }

  let learners, mentors;
  try {
    learners = await fetchLearners();
    mentors = await fetchMentors();
    // console.log('Fetched Learners:', learners);
    // console.log('Fetched Mentors:', mentors);
  } catch (error) {
    console.log('Error fetching data:', error);
    return;
  }

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇
  if (learners && mentors) {
    learners.forEach(learner => {
      const mentorNames = [];

      // Iterate through the mentor IDs of the current learner
      learner.mentors.forEach(mentorId => {
        // Find the mentor object with the matching ID in the mentors array
        const mentor = mentors.find(m => m.id === mentorId);
        if (mentor) {
          const mentorName = `${mentor.firstName} ${mentor.lastName}`;
          mentorNames.push(mentorName);
        } else {
          console.log(`Mentor with id ${mentorId} not found`);
        }
      });

      // Update the mentors property of the current learner with the mentorNames array
      learner.mentors = mentorNames;
    });
  }

  const cardsContainer = document.querySelector('.cards');
  const info = document.querySelector('.info');
  info.textContent = 'No learner is selected';

  cardsContainer.innerHTML = '';

  // 👆 ==================== TASK 2 END ====================== 👆

  // 👇 ==================== TASK 3 START ==================== 👇

  function toggleCardSelection(event, learner) {
    const card = event.currentTarget; // Use currentTarget to get the element that triggered the event
    const isCardSelected = card.classList.contains('selected');

    // Deselect all other cards
    document.querySelectorAll('.card.selected').forEach(otherCard => {
      if (otherCard!== card) {
        otherCard.classList.remove('selected');
        otherCard.querySelector('h3').textContent = otherCard.dataset.fullName;
        otherCard.querySelector('.mentors-list').style.display = 'none';
        otherCard.querySelector('h4').classList.remove('open');
        otherCard.querySelector('h4').classList.add('closed');
      }
    });

    if (!isCardSelected) {
      card.classList.remove('selected');
      card.querySelector('.mentors-list').style.display = 'none';
      card.querySelector('h4').classList.remove('open');
      card.querySelector('h4').classList.add('closed');
      document.querySelector('.info').textContent = 'No learner is selected';
    } else {
      card.classList.add('selected');
      card.querySelector('.mentors-list').style.display = 'block';
      card.querySelector('h4').classList.remove('closed');
      card.querySelector('h4').classList.add('open');
      document.querySelector('.info').textContent = `The selected learner is ${learner.fullName}`;
    }
  }

  for (let learner of learners) {
    const card = document.createElement('div');
    const heading = document.createElement('h3');
    const email = document.createElement('div');
    const mentorsHeading = document.createElement('h4');
    const mentorsList = document.createElement('ul');

    mentorsList.style.display = 'none';
    mentorsHeading.classList.add('closed');

    card.classList.add('card');
    heading.classList.add('heading');
    email.classList.add('email');
    mentorsList.classList.add('mentors-list');

    heading.textContent = learner.fullName;
    email.textContent = learner.email;
    mentorsHeading.textContent = 'Mentors';

    learner.mentors.forEach(mentorName => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentorName;
      mentorsList.appendChild(mentorItem);
    });

    card.appendChild(heading);
    card.appendChild(email);
    card.appendChild(mentorsHeading);
    card.appendChild(mentorsList);
    card.dataset.fullName = learner.fullName;
    cardsContainer.appendChild(card);

    card.addEventListener('click', (event) => {
      toggleCardSelection(event, learner);
    });
  
  
  
  

  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  
//     if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
// else sprintChallenge5();

    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
