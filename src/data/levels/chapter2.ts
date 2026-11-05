import { MysteryLevel } from '../../types/game';

export const CHAPTER_2_LEVELS: MysteryLevel[] = [
  {
    id: 21,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Missing Homework',
    difficulty: 'Easy',
    story: 'A student completed homework, but the teacher could not find it in the notebook.',
    solution: 'The student submitted it digitally online.',
    hints: [
      'Think beyond physical paper.',
      'The teacher checked the notebook only.',
      'It was an online digital submission.',
    ],
    positiveFacts: ['digital', 'online', 'email', 'uploaded', 'computer', 'portal', 'submitted online'],
    negativeFacts: ['stolen', 'eaten by dog', 'left at home', 'erased with magic ink'],
    irrelevantFacts: ['grade level', 'subject', 'notebook color', 'time submitted'],
    suggestedQuestions: [
      'Was the homework completed on paper?',
      'Was it submitted digitally or online?',
      'Did the student actually complete the work?'
    ],
    solutionKeywords: [['digital', 'online', 'uploaded', 'email', 'internet', 'portal', 'computer']]
  },
  {
    id: 22,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Empty Lunchbox',
    difficulty: 'Easy',
    story: 'A lunchbox was empty at lunchtime, but the student had not eaten anything.',
    solution: 'The student had forgotten to pack lunch in the morning.',
    hints: [
      'Check what was packed in the morning.',
      'It was empty from the beginning.',
      'No food was ever placed inside.',
    ],
    positiveFacts: ['forgot to pack', 'never packed', 'empty from start', 'no food put in', 'forgotten at home'],
    negativeFacts: ['someone stole food', 'dropped on the way', 'student ate it early and forgot'],
    irrelevantFacts: ['lunchbox color', 'type of food preferred', 'cafeteria menu'],
    suggestedQuestions: [
      'Was there ever food inside the lunchbox today?',
      'Did someone steal the food?',
      'Did the student forget to pack food in the morning?'
    ],
    solutionKeywords: [['forgot', 'never', 'not packed', 'empty from start', 'left food at home']]
  },
  {
    id: 23,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Extra Student',
    difficulty: 'Easy',
    story: 'A class had 30 students, but the attendance sheet showed 31.',
    solution: 'The teacher accidentally counted themselves as a student.',
    hints: [
      'Check who counted the class.',
      'Someone was included incorrectly.',
      'The teacher counted themselves.',
    ],
    positiveFacts: ['teacher counted themselves', 'included teacher', 'counting error by teacher', 'teacher was 31st'],
    negativeFacts: ['ghost student', 'new student arrived', 'twin sibling snuck in'],
    irrelevantFacts: ['subject', 'classroom number', 'students ages'],
    suggestedQuestions: [
      'Was there an unregistered student in the room?',
      'Did the teacher accidentally count themselves?',
      'Was the attendance count a human mistake?'
    ],
    solutionKeywords: [['teacher', 'instructor'], ['themselves', 'counted self', 'included herself', 'included himself']]
  },
  {
    id: 24,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Flying Paper',
    difficulty: 'Easy',
    story: 'A paper flew across a classroom without anyone throwing it.',
    solution: 'Air from the ceiling fan blew it away.',
    hints: [
      'Look above.',
      'Moving air caused it.',
      'The ceiling fan blew it away.',
    ],
    positiveFacts: ['ceiling fan', 'fan', 'draft', 'wind from fan', 'air current'],
    negativeFacts: ['ghost', 'paper airplane drone', 'hidden string', 'thrown by student'],
    irrelevantFacts: ['paper color', 'notes on paper', 'room temperature'],
    suggestedQuestions: [
      'Did a person throw the paper?',
      'Was the ceiling fan turned on?',
      'Did moving air or wind blow the paper?'
    ],
    solutionKeywords: [['fan', 'ceiling fan', 'air draft', 'wind']]
  },
  {
    id: 25,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Wrong Answer',
    difficulty: 'Easy',
    story: 'A student gave the correct answer but received no marks.',
    solution: 'The student answered a different question from the one being graded.',
    hints: [
      'Compare the questions.',
      'The answer was correct elsewhere.',
      'It belonged to another question.',
    ],
    positiveFacts: ['different question', 'wrong question number', 'answered another question', 'misread question number'],
    negativeFacts: ['teacher made error in grading key', 'student cheated', 'bad handwriting'],
    irrelevantFacts: ['subject', 'test name', 'date'],
    suggestedQuestions: [
      'Was the answer factually correct for the question asked?',
      'Did the student answer a different question on the exam?',
      'Was it written in the wrong question section?'
    ],
    solutionKeywords: [['different', 'another', 'wrong'], ['question', 'number', 'section']]
  },
  {
    id: 26,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Vanishing Chalk',
    difficulty: 'Easy',
    story: 'A piece of chalk became shorter during class.',
    solution: 'The teacher used it to write on the blackboard, naturally wearing it down.',
    hints: [
      'It was being used.',
      'Chalk wears away.',
      'Writing consumed the chalk.',
    ],
    positiveFacts: ['used for writing', 'chalkboard writing', 'wore down', 'used by teacher', 'writing consumed it'],
    negativeFacts: ['snapped and stolen', 'dissolved in liquid', 'eaten by pet'],
    irrelevantFacts: ['chalk color', 'teacher name', 'blackboard size'],
    suggestedQuestions: [
      'Did someone steal a piece of the chalk?',
      'Was the chalk used to write on the board?',
      'Did writing wear the chalk down naturally?'
    ],
    solutionKeywords: [['used', 'writing', 'wrote', 'board', 'blackboard', 'wore down', 'consumed']]
  },
  {
    id: 27,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Noisy Library',
    difficulty: 'Easy',
    story: 'A library was noisy even though all visitors were silent.',
    solution: 'Construction work was taking place outside the library.',
    hints: [
      'Look outside the library.',
      'Sound can come from outside.',
      'Nearby construction caused the noise.',
    ],
    positiveFacts: ['outside', 'construction', 'drilling', 'road work', 'building work outside', 'external noise'],
    negativeFacts: ['ghosts whispering', 'speakers left on', 'visitors breaking rules'],
    irrelevantFacts: ['number of books', 'librarian name', 'library floor'],
    suggestedQuestions: [
      'Did the noise originate from inside the library?',
      'Was there construction or work happening outside?',
      'Were the library visitors making the sound?'
    ],
    solutionKeywords: [['construction', 'outside', 'external', 'street', 'road work', 'drilling']]
  },
  {
    id: 28,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Missing Page',
    difficulty: 'Easy',
    story: 'A book had no page 10, but it was complete.',
    solution: 'Its pages were numbered using an intentional publishing format that skipped 10 or used Roman numerals for intro.',
    hints: [
      'Check the numbering system.',
      'Not every book numbers pages normally.',
      'The publishing layout skipped page 10 intentionally.',
    ],
    positiveFacts: ['numbering format', 'intentional numbering', 'layout design', 'skipped intentionally', 'pagination scheme'],
    negativeFacts: ['page torn out', 'misprint error', 'censorship'],
    irrelevantFacts: ['book title', 'author', 'cover art'],
    suggestedQuestions: [
      'Was a page physically torn out of the book?',
      'Was the page numbering layout intentional?',
      'Did the book follow an unconventional publishing pagination?'
    ],
    solutionKeywords: [['numbering', 'pagination', 'format', 'layout', 'intentional', 'skipped']]
  },
  {
    id: 29,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Double Bell',
    difficulty: 'Easy',
    story: 'The school bell rang twice, but only one bell existed.',
    solution: 'The same bell sound was heard twice due to an acoustic echo.',
    hints: [
      'Think about sound behavior.',
      'A sound can repeat.',
      'The second sound was an echo.',
    ],
    positiveFacts: ['echo', 'acoustic reflection', 'sound bounced', 'hallway echo', 'sound reflection'],
    negativeFacts: ['bell struck twice', 'two bells installed', 'recording played'],
    irrelevantFacts: ['bell tone', 'time of day', 'courtyard width'],
    suggestedQuestions: [
      'Was the physical bell struck two times?',
      'Was the second sound an echo?',
      'Did sound waves bounce off the school walls?'
    ],
    solutionKeywords: [['echo', 'sound reflection', 'bounced']]
  },
  {
    id: 30,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: "The Teacher's Secret",
    difficulty: 'Easy',
    story: 'A teacher knew the exact answer before asking the class.',
    solution: 'The teacher had prepared the lesson plan and answer key in advance.',
    hints: [
      'Think about preparation.',
      'The answer was not a surprise to the teacher.',
      'The teacher already prepared the lesson answer key.',
    ],
    positiveFacts: ['lesson plan', 'answer key', 'prepared in advance', 'created the question', 'already prepared'],
    negativeFacts: ['mind reading', 'telepathy', 'someone texted the teacher'],
    irrelevantFacts: ['subject', 'time of class', 'school name'],
    suggestedQuestions: [
      'Did the teacher use supernatural abilities?',
      'Did the teacher write the question and prepare the answer key beforehand?',
      'Was it simply prepared in the lesson plan?'
    ],
    solutionKeywords: [['prepared', 'lesson plan', 'answer key', 'advance', 'wrote it']]
  },
  {
    id: 31,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Wet Blackboard',
    difficulty: 'Easy',
    story: 'A blackboard became wet, but nobody poured water on it.',
    solution: 'Condensation formed because warm humid air met a cold board.',
    hints: [
      'Think about temperature.',
      'Water can form from humid air.',
      'Condensation made it wet.',
    ],
    positiveFacts: ['condensation', 'humidity', 'warm air', 'cold blackboard', 'moisture in air'],
    negativeFacts: ['roof leak', 'sprayed with hose', 'cleaning lady forgot to wipe'],
    irrelevantFacts: ['board size', 'classroom number', 'subject'],
    suggestedQuestions: [
      'Did water drop from the ceiling?',
      'Was the wetness caused by condensation?',
      'Did humid air condense on the cold surface?'
    ],
    solutionKeywords: [['condensation', 'humidity', 'condensed', 'moisture in air']]
  },
  {
    id: 32,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Empty Exam Hall',
    difficulty: 'Easy',
    story: 'An exam hall was empty at the scheduled exam time, but the exam was happening.',
    solution: 'The examination was being conducted online from students\' homes.',
    hints: [
      'The exam was not necessarily in the hall.',
      'Think about online classes.',
      'Students were taking it remotely from home.',
    ],
    positiveFacts: ['online', 'remote', 'from home', 'digital exam', 'remote test', 'virtual examination'],
    negativeFacts: ['all students skipped', 'hall was locked', 'exam was cancelled'],
    irrelevantFacts: ['exam topic', 'hall capacity', 'date'],
    suggestedQuestions: [
      'Were students taking the exam inside the school building?',
      'Was the exam held remotely online from students homes?',
      'Was the exam cancelled?'
    ],
    solutionKeywords: [['online', 'remote', 'from home', 'virtual', 'internet']]
  },
  {
    id: 33,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Disappearing Eraser',
    difficulty: 'Easy',
    story: 'An eraser vanished during class.',
    solution: 'It was inside the student\'s pencil case where they had put it away.',
    hints: [
      'Check nearby storage.',
      'The student had put it away.',
      'It was safely inside the pencil case.',
    ],
    positiveFacts: ['pencil case', 'pencil pouch', 'put away', 'inside pencil box', 'in bag'],
    negativeFacts: ['stolen', 'fell through floor', 'dissolved'],
    irrelevantFacts: ['eraser color', 'desk position', 'subject'],
    suggestedQuestions: [
      'Did another student take the eraser?',
      'Was the eraser put away inside a pencil case?',
      'Was the eraser still on the desk?'
    ],
    solutionKeywords: [['pencil case', 'pencil box', 'pouch', 'put away', 'inside']]
  },
  {
    id: 34,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Unread Book',
    difficulty: 'Easy',
    story: 'A student finished a book without reading its printed pages.',
    solution: 'The student listened to an audiobook version.',
    hints: [
      'Books can be heard.',
      'Think about audio.',
      'It was an audiobook.',
    ],
    positiveFacts: ['audiobook', 'listened', 'audio', 'headphones', 'heard it', 'spoken book'],
    negativeFacts: ['cheated by reading summary', 'watched a movie', 'speed reading trick'],
    irrelevantFacts: ['book title', 'narrator name', 'device brand'],
    suggestedQuestions: [
      'Did the student use their eyes to read?',
      'Did the student listen to an audiobook?',
      'Did someone read it aloud to them?'
    ],
    solutionKeywords: [['audiobook', 'audio book', 'listened', 'listening', 'heard']]
  },
  {
    id: 35,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Wrong Classroom',
    difficulty: 'Easy',
    story: 'A student entered the correct classroom but was told they were in the wrong class.',
    solution: 'The room number was correct, but the timetable had changed or another class was scheduled there at that hour.',
    hints: [
      'Check the timetable.',
      'Room and class are different.',
      'Another class was scheduled there at that time.',
    ],
    positiveFacts: ['timetable change', 'schedule changed', 'different period', 'time slot', 'schedule swap'],
    negativeFacts: ['student was suspended', 'teacher mistook identity', 'wrong day of week'],
    irrelevantFacts: ['room number', 'subject', 'student name'],
    suggestedQuestions: [
      'Was the student in the right room physically?',
      'Had the timetable or schedule changed?',
      'Was another class scheduled in that room at that time?'
    ],
    solutionKeywords: [['schedule', 'timetable', 'time', 'different period', 'another class']]
  },
  {
    id: 36,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Silent Presentation',
    difficulty: 'Easy',
    story: 'A student gave a presentation without speaking.',
    solution: 'The presentation used text, slides, and images only.',
    hints: [
      'Speech is not always necessary.',
      'Look at the slides.',
      'The presentation relied on written text and images.',
    ],
    positiveFacts: ['slides only', 'text and pictures', 'silent video', 'written display', 'text slides'],
    negativeFacts: ['student lost voice mid talk', 'sign language only', 'technical failure'],
    irrelevantFacts: ['topic', 'grade received', 'projector brand'],
    suggestedQuestions: [
      'Did the presentation communicate information effectively?',
      'Was the presentation made purely with slides, text, and visual images?',
      'Did an audio error occur?'
    ],
    solutionKeywords: [['slides', 'text', 'visual', 'written', 'pictures', 'display']]
  },
  {
    id: 37,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Missing Teacher',
    difficulty: 'Easy',
    story: 'Students attended class, but no teacher entered the room.',
    solution: 'The teacher conducted the lesson through a recorded video on the projector.',
    hints: [
      'Look at the screen.',
      'The teacher was not physically present.',
      'It was a recorded video lesson.',
    ],
    positiveFacts: ['video lesson', 'recorded video', 'projector', 'remote teacher', 'pre recorded video'],
    negativeFacts: ['students taught themselves', 'teacher was hiding', 'substitute failed to show'],
    irrelevantFacts: ['screen size', 'subject', 'class duration'],
    suggestedQuestions: [
      'Was a teacher teaching the lesson?',
      'Was the lesson shown via a video recording or projector?',
      'Was the teacher physically in the room?'
    ],
    solutionKeywords: [['video', 'recording', 'recorded', 'projector', 'screen', 'remote']]
  },
  {
    id: 38,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Pencil Mystery',
    difficulty: 'Easy',
    story: 'A pencil wrote without a sharp tip.',
    solution: 'It was a mechanical pencil with a fine lead refill.',
    hints: [
      'Think about pencil types.',
      'The lead was still available.',
      'It was a mechanical pencil.',
    ],
    positiveFacts: ['mechanical pencil', 'lead pencil', 'fine lead', 'click pencil', 'propelling pencil'],
    negativeFacts: ['stylus on tablet', 'magic marker', 'used the eraser end'],
    irrelevantFacts: ['pencil color', 'brand', 'paper type'],
    suggestedQuestions: [
      'Was it a traditional wooden pencil?',
      'Was it a mechanical pencil?',
      'Did it use thin graphite lead that clicks out?'
    ],
    solutionKeywords: [['mechanical', 'propelling', 'lead pencil', 'click pencil']]
  },
  {
    id: 39,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Full Empty Desk',
    difficulty: 'Easy',
    story: 'A desk was described as empty, but it had many objects on it.',
    solution: 'It was empty of students/people, not objects.',
    hints: [
      'Read the wording carefully.',
      'Empty can refer to people.',
      'Nobody was sitting there.',
    ],
    positiveFacts: ['empty of people', 'no student sitting there', 'unoccupied', 'no person at desk', 'vacant seat'],
    negativeFacts: ['desk was in another room', 'optical illusion', 'objects were invisible'],
    irrelevantFacts: ['type of objects', 'desk material', 'row number'],
    suggestedQuestions: [
      'Did the word empty refer to the surface objects?',
      'Did empty mean that no student was seated there?',
      'Was the seat unoccupied?'
    ],
    solutionKeywords: [['student', 'person', 'people', 'sitting', 'unoccupied', 'vacant', 'seat']]
  },
  {
    id: 40,
    chapterId: 2,
    chapterName: 'School Mysteries',
    title: 'The Final School Mystery',
    difficulty: 'Easy',
    story: 'A student was first to arrive and last to leave, but never attended a class.',
    solution: 'The student was the school caretaker\'s child who waited in the school office.',
    hints: [
      'Think about why someone might be at school.',
      'Being at school is not the same as attending class.',
      'The student waited in the school office with their parent.',
    ],
    positiveFacts: ['caretaker child', 'custodian child', 'staff child', 'waited in office', 'child of school worker'],
    negativeFacts: ['truant student', 'secret spy', 'ghost of former student'],
    irrelevantFacts: ['age', 'school hours', 'parent name'],
    suggestedQuestions: [
      'Was this student enrolled in classes at this school today?',
      'Was this person the child of the school caretaker or staff member?',
      'Did they wait in the school office with their parent?'
    ],
    solutionKeywords: [['caretaker', 'janitor', 'custodian', 'staff', 'worker'], ['child', 'kid', 'son', 'daughter', 'office']]
  }
];
