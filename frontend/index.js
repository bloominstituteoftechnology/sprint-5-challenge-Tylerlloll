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
      // console.log('Processing learner:', learner);
      
      const mentorNames = [];
  
      // Iterate through the mentor IDs of the current learner
      learner.mentors.forEach(mentorId => {
        // Find the mentor object with the matching ID in the mentors array
        const mentor = mentors.find(m => m.id === mentorId);
        if (mentor) {
          const mentorName = `${mentor.firstName} ${mentor.lastName}`;
          mentorNames.push(mentorName);
          // console.log(`Mapped mentorId ${mentorId} to mentor ${mentorName}`);
        } else {
          console.log(`Mentor with id ${mentorId} not found`);
        }
      });
  
      // Update the mentors property of the current learner with the mentorNames array
      learner.mentors = mentorNames;
      // console.log('Updated learner:', learner);
    });
  
    // console.log('Combined Learners:', learners);
  }
    // const card = document.querySelector(`[data-full-name="${learners.fullName}"]`);
    const cardsContainer = document.querySelector('.cards');
    const info = document.querySelector('.info');
    info.textContent = 'No learner is selected';

    cardsContainer.innerHTML = ''


  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }
  

  // 👆 ==================== TASK 2 END ====================== 👆



  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const card = document.createElement('div')
    const heading = document.createElement('h3')
    const email = document.createElement('div')
    const mentorsHeading = document.createElement('h4')
    const mentorsList = document.createElement('ul')
    
    mentorsList.style.display = 'none';
    mentorsHeading.classList.add('closed')

    card.classList.add('card');
    heading.classList.add('heading');
    email.classList.add('email');
    mentorsList.classList.add('mentors-list');
    

    heading.textContent = learner.fullName;
    email.textContent = learner.email;
    mentorsHeading.textContent = 'Mentors';

    // console.log('Mentors for', learner.fullName, ':', learner.mentors);

    learner.mentors.forEach(mentorName => {
      const mentorItem = document.createElement('li');
      mentorItem.textContent = mentorName;
      mentorsList.appendChild(mentorItem);
      // console.log('Appending mentor:', mentorName);
    });

    card.appendChild(heading);
    card.appendChild(email);
    card.appendChild(mentorsHeading);
    card.appendChild(mentorsList);
    card.dataset.fullName = learner.fullName;
    cardsContainer.appendChild(card);
    
    card.addEventListener('click', evt => {
      const clickedElement = evt.target;
      const isCardOrChild = clickedElement === card || card.contains(clickedElement);
    
      if (isCardOrChild) {
        const isCardSelected = card.classList.contains('selected');
        const mentorsList = card.querySelector('.mentors-list');
        const mentorsHeading = card.querySelector('h4');
    
        document.querySelectorAll('.card').forEach(crd => {
          crd.classList.remove('selected');
          crd.querySelector('.mentors-list').style.display = 'none';
          crd.querySelector('h4').classList.replace('open', 'closed');
        });
    
        if (!isCardSelected) {
          card.classList.add('selected');
          mentorsList.style.display = 'block';
          mentorsHeading.classList.replace('closed', 'open');
          info.textContent = `The selected learner is ${learner.fullName}`;
        } else {
          card.classList.remove('selected'); // Remove 'selected' class if clicked again
          mentorsList.style.display = 'block'; // Keep mentors visible when card is selected
          mentorsHeading.classList.replace('open', 'closed');
          info.textContent = 'No learner is selected';
        }
      }
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
