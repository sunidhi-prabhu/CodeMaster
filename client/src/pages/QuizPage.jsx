import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questionsByTopic = {
  "Machine Learning Basics": [ {
      id: "mlb1",
      question: "What is overfitting in machine learning?",
      options: [
        "A model that performs well on training but poorly on new data",
        "A model that is too simple to learn patterns",
        "When the dataset is too large",
        "When the learning rate is too low"
      ],
      correctAnswer: 0
    },
    {
      id: "mlb2",
      question: "Which of the following is a type of supervised learning?",
      options: ["Clustering", "Classification", "Dimensionality Reduction", "Anomaly Detection"],
      correctAnswer: 1
    },
    {
      id: "mlb3",
      question: "What is the goal of a regression task?",
      options: [
        "To classify data into categories",
        "To reduce dimensionality",
        "To predict a continuous value",
        "To group data into clusters"
      ],
      correctAnswer: 2
    },
    {
      id: "mlb4",
      question: "Which one is a performance metric for classification models?",
      options: ["MSE", "RMSE", "Accuracy", "MAE"],
      correctAnswer: 2
    },
    {
      id: "mlb5",
      question: "Which algorithm is typically used for linear classification?",
      options: ["K-Means", "SVM", "PCA", "Apriori"],
      correctAnswer: 1
    }
],
  "Frontend Development with React": [ {
      id: "react1",
      question: "What hook would you use for side effects like data fetching?",
      options: ["useEffect", "useState", "useCallback", "useRef"],
      correctAnswer: 0
    },
    {
      id: "react2",
      question: "Which hook is used to manage component state?",
      options: ["useMemo", "useEffect", "useState", "useReducer"],
      correctAnswer: 2
    },
    {
      id: "react3",
      question: "What is JSX?",
      options: [
        "A CSS preprocessor",
        "A way to write HTML in JavaScript",
        "A state management library",
        "A React testing tool"
      ],
      correctAnswer: 1
    },
    {
      id: "react4",
      question: "How do you lift state up in React?",
      options: [
        "By using useRef",
        "By moving state to a common ancestor",
        "By using context directly",
        "By converting the component to a class"
      ],
      correctAnswer: 1
    },
    {
      id: "react5",
      question: "What does the useMemo hook do?",
      options: [
        "Manages async operations",
        "Prevents re-rendering of components",
        "Caches expensive calculations",
        "Creates refs to DOM elements"
      ],
      correctAnswer: 2
    }
],
  "Advanced Python": [ {
      id: "ap1",
      question: "What does a Python generator return?",
      options: ["List", "Iterator", "Dictionary", "Set"],
      correctAnswer: 1
    },
    {
      id: "ap2",
      question: "What is the purpose of decorators in Python?",
      options: [
        "To format strings",
        "To handle exceptions",
        "To modify functions or methods",
        "To optimize loops"
      ],
      correctAnswer: 2
    },
    {
      id: "ap3",
      question: "What does the 'with' statement manage?",
      options: [
        "Context management",
        "Function definitions",
        "Class inheritance",
        "Threading"
      ],
      correctAnswer: 0
    },
    {
      id: "ap4",
      question: "Which module in Python allows multiprocessing?",
      options: ["threading", "os", "time", "multiprocessing"],
      correctAnswer: 3
    },
    {
      id: "ap5",
      question: "What is the result of `list(map(lambda x: x*x, [1,2,3]))`?",
      options: ["[1,2,3]", "[1,4,9]", "[2,4,6]", "[1,1,1]"],
      correctAnswer: 1
    }
],
  "Deep Learning Foundations": [  {
      id: "dlf1",
      question: "What is a perceptron?",
      options: [
        "A type of loss function",
        "The input layer of a CNN",
        "The simplest type of neural network unit",
        "A data normalization technique"
      ],
      correctAnswer: 2
    },
    {
      id: "dlf2",
      question: "What activation function introduces non-linearity?",
      options: ["ReLU", "Sigmoid", "Tanh", "All of the above"],
      correctAnswer: 3
    },
    {
      id: "dlf3",
      question: "What is the vanishing gradient problem?",
      options: [
        "Gradients that oscillate",
        "Gradients that become too large",
        "Gradients that become too small to update weights",
        "When no gradients are computed"
      ],
      correctAnswer: 2
    },
    {
      id: "dlf4",
      question: "Which optimization algorithm is commonly used in deep learning?",
      options: ["Adam", "K-Means", "Apriori", "SVM"],
      correctAnswer: 0
    },
    {
      id: "dlf5",
      question: "What does dropout do during training?",
      options: [
        "Increases learning rate",
        "Reduces number of neurons",
        "Prevents overfitting by randomly disabling neurons",
        "Normalizes input data"
      ],
      correctAnswer: 2
    }
],
  "Java Basics": [ {
      id: "jb1",
      question: "Which keyword is used to define a class in Java?",
      options: ["class", "struct", "define", "object"],
      correctAnswer: 0
    },
    {
      id: "jb2",
      question: "What is the default value of an uninitialized int variable in Java?",
      options: ["0", "null", "undefined", "Depends on context"],
      correctAnswer: 0
    },
    {
      id: "jb3",
      question: "What is the entry point of any Java program?",
      options: [
        "init() method",
        "main() method",
        "start() method",
        "run() method"
      ],
      correctAnswer: 1
    },
    {
      id: "jb4",
      question: "Which data type is not a primitive in Java?",
      options: ["int", "boolean", "String", "double"],
      correctAnswer: 2
    },
    {
      id: "jb5",
      question: "What is the size of an int in Java?",
      options: ["8 bits", "16 bits", "32 bits", "64 bits"],
      correctAnswer: 2
    }
],
  "Advanced Java": [ {
      id: "aj1",
      question: "What does the 'final' keyword mean for a variable?",
      options: [
        "It cannot be modified",
        "It must be public",
        "It can be used only once",
        "It will be garbage collected"
      ],
      correctAnswer: 0
    },
    {
      id: "aj2",
      question: "Which interface does a class implement to create threads?",
      options: ["Runnable", "Threadable", "Executor", "Callable"],
      correctAnswer: 0
    },
    {
      id: "aj3",
      question: "What is Java Reflection used for?",
      options: [
        "Managing exceptions",
        "Loading UI components",
        "Inspecting and modifying code at runtime",
        "Logging program output"
      ],
      correctAnswer: 2
    },
    {
      id: "aj4",
      question: "Which collection class is synchronized?",
      options: ["ArrayList", "HashSet", "Vector", "HashMap"],
      correctAnswer: 2
    },
    {
      id: "aj5",
      question: "What does JDBC stand for?",
      options: [
        "Java Data Binding Connector",
        "Java Database Connectivity",
        "Java Development Binary Class",
        "Joint Data Byte Communication"
      ],
      correctAnswer: 1
    }
],
  "Data Structures & Algorithms in Java": [ {
      id: "dsj1",
      question: "What is the time complexity of binary search in a sorted array?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: 1
    },
    {
      id: "dsj2",
      question: "Which Java class can be used to implement a stack?",
      options: ["Queue", "ArrayList", "Stack", "Set"],
      correctAnswer: 2
    },
    {
      id: "dsj3",
      question: "Which data structure uses FIFO order?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correctAnswer: 1
    },
    {
      id: "dsj4",
      question: "What is the height of a balanced binary tree with n nodes?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      correctAnswer: 1
    },
    {
      id: "dsj5",
      question: "Which sorting algorithm has O(n^2) time complexity?",
      options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Heap Sort"],
      correctAnswer: 2
    }
],
  "Data Structures & Algorithms in Python": [ {
      id: "dsp1",
      question: "Which Python data structure uses key-value pairs?",
      options: ["List", "Tuple", "Set", "Dictionary"],
      correctAnswer: 3
    },
    {
      id: "dsp2",
      question: "What is the time complexity to access an element in a list by index?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      correctAnswer: 0
    },
    {
      id: "dsp3",
      question: "Which module in Python supports heaps?",
      options: ["heap", "heapy", "heapq", "pyheap"],
      correctAnswer: 2
    },
    {
      id: "dsp4",
      question: "What does the 'pop()' method do in a list?",
      options: [
        "Removes and returns last element",
        "Adds an element",
        "Sorts the list",
        "Returns the first element"
      ],
      correctAnswer: 0
    },
    {
      id: "dsp5",
      question: "Which algorithm uses divide and conquer?",
      options: ["Selection Sort", "Bubble Sort", "Merge Sort", "Insertion Sort"],
      correctAnswer: 2
    }
],
  "DSA with C/C++": [ {
      id: "dsc1",
      question: "Which data structure uses LIFO order?",
      options: ["Queue", "Array", "Stack", "Tree"],
      correctAnswer: 2
    },
    {
      id: "dsc2",
      question: "What is the time complexity of linear search?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correctAnswer: 1
    },
    {
      id: "dsc3",
      question: "Which C++ STL container is used for key-value storage?",
      options: ["vector", "list", "map", "deque"],
      correctAnswer: 2
    },
    {
      id: "dsc4",
      question: "Which algorithm finds the shortest path in a graph?",
      options: ["DFS", "BFS", "Dijkstra’s", "Kruskal’s"],
      correctAnswer: 2
    },
    {
      id: "dsc5",
      question: "Which is a self-balancing binary search tree?",
      options: ["Heap", "AVL Tree", "Trie", "Graph"],
      correctAnswer: 1
    }
],
  "JavaScript Basics": [ {
      id: "jsb1",
      question: "Which of the following is a primitive type in JavaScript?",
      options: ["Object", "Array", "Function", "String"],
      correctAnswer: 3
    },
    {
      id: "jsb2",
      question: "What does '===' operator do?",
      options: [
        "Compares value only",
        "Compares type only",
        "Compares value and type",
        "Assigns a value"
      ],
      correctAnswer: 2
    },
    {
      id: "jsb3",
      question: "Which keyword declares a block-scoped variable?",
      options: ["var", "const", "let", "both let and const"],
      correctAnswer: 3
    },
    {
      id: "jsb4",
      question: "What will `typeof null` return?",
      options: ["'null'", "'object'", "'undefined'", "'boolean'"],
      correctAnswer: 1
    },
    {
      id: "jsb5",
      question: "What is the result of `2 + '2'` in JavaScript?",
      options: ["4", "'4'", "22", "'22'"],
      correctAnswer: 3
    }
  ],
  "JavaScript Advanced Patterns": [  {
      id: "jsap1",
      question: "What does the Module Pattern in JavaScript provide?",
      options: [
        "Global variables",
        "Encapsulation via IIFEs",
        "CSS styling",
        "DOM manipulation"
      ],
      correctAnswer: 1
    },
    {
      id: "jsap2",
      question: "What is a higher-order function?",
      options: [
        "A function that returns void",
        "A function without parameters",
        "A function that takes or returns another function",
        "A function in strict mode"
      ],
      correctAnswer: 2
    },
    {
      id: "jsap3",
      question: "What is memoization used for?",
      options: [
        "Logging results",
        "Caching function results for efficiency",
        "Parsing JSON",
        "Managing promises"
      ],
      correctAnswer: 1
    },
    {
      id: "jsap4",
      question: "Which operator allows default values in destructuring?",
      options: ["??", "...", "||", "&&"],
      correctAnswer: 0
    },
    {
      id: "jsap5",
      question: "What pattern helps avoid callback hell?",
      options: ["Promises", "setTimeout", "for loops", "eval"],
      correctAnswer: 0
    }
],
  "Web Development Basics": [  {
      id: "wdb1",
      question: "What does HTTP stand for?",
      options: [
        "HyperText Transfer Protocol",
        "High Transfer Text Protocol",
        "HyperText Transmission Protocol",
        "Hyperlink Text Transfer Protocol"
      ],
      correctAnswer: 0
    },
    {
      id: "wdb2",
      question: "Which status code means 'Not Found'?",
      options: ["200", "301", "404", "500"],
      correctAnswer: 2
    },
    {
      id: "wdb3",
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Standards",
        "Creative Style Syntax",
        "Colorful Style Sheets"
      ],
      correctAnswer: 0
    },
    {
      id: "wdb4",
      question: "What HTML element is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: 1
    },
    {
      id: "wdb5",
      question: "Which HTML tag defines the document’s body?",
      options: ["<head>", "<body>", "<title>", "<meta>"],
      correctAnswer: 1
    }
],
  "Full-Stack JavaScript Backend": [  {
      id: "fsjb1",
      question: "Which runtime is used for running JavaScript on the server?",
      options: ["IIS", "Apache", "Node.js", "Deno"],
      correctAnswer: 2
    },
    {
      id: "fsjb2",
      question: "Which package manager is commonly used in Node projects?",
      options: ["pip", "npm", "gem", "composer"],
      correctAnswer: 1
    },
    {
      id: "fsjb3",
      question: "Which library is used to build REST APIs in Node.js?",
      options: ["Express", "React", "Angular", "Django"],
      correctAnswer: 0
    },
    {
      id: "fsjb4",
      question: "What is middleware in Express?",
      options: [
        "A database model",
        "A route handler",
        "A function between request and response",
        "A special view"
      ],
      correctAnswer: 2
    },
    {
      id: "fsjb5",
      question: "What module do you use to connect Node to MongoDB?",
      options: ["mongoose", "redux", "sequelize", "angular"],
      correctAnswer: 0
    }
],
  "Spring Boot Microservices": [ {
      id: "sbm1",
      question: "What annotation marks a Spring Boot application?",
      options: ["@Controller", "@Service", "@SpringBootApplication", "@Repository"],
      correctAnswer: 2
    },
    {
      id: "sbm2",
      question: "What is Spring Cloud used for?",
      options: [
        "Building native mobile apps",
        "Microservices orchestration (config, discovery)",
        "Handling UI rendering",
        "Big data processing"
      ],
      correctAnswer: 1
    },
    {
      id: "sbm3",
      question: "Which tool is used for service discovery in Spring Cloud?",
      options: ["Eureka", "Kafka", "RabbitMQ", "Redis"],
      correctAnswer: 0
    },
    {
      id: "sbm4",
      question: "What is the purpose of circuit breaker patterns?",
      options: [
        "Fallback in case of failed services",
        "Load balancing HTTP requests",
        "Encrypting data",
        "Scheduling tasks"
      ],
      correctAnswer: 0
    },
    {
      id: "sbm5",
      question: "Which file defines dependencies in a Spring Boot project?",
      options: ["pom.xml", "package.json", "requirements.txt", "build.gradle"],
      correctAnswer: 0
    }
],
  "HTML, CSS & Advanced Layouts": [  {
      id: "htmlcss1",
      question: "Which CSS property enables grid layout?",
      options: ["display: grid", "position: grid", "layout: grid", "box: grid"],
      correctAnswer: 0
    },
    {
      id: "htmlcss2",
      question: "What does Flexbox’s justify-content: space-between do?",
      options: [
        "Places all items at start",
        "Even spacing including ends",
        "Spacing only between items",
        "Aligns content vertically"
      ],
      correctAnswer: 2
    },
    {
      id: "htmlcss3",
      question: "Which unit is relative to the viewport width?",
      options: ["px", "%", "vw", "pt"],
      correctAnswer: 2
    },
    {
      id: "htmlcss4",
      question: "What does media queries in CSS help with?",
      options: [
        "Server-side rendering",
        "Styling based on screen size",
        "JavaScript functionality",
        "CSS variables"
      ],
      correctAnswer: 1
    },
    {
      id: "htmlcss5",
      question: "Which HTML element is semantic for navigation?",
      options: ["<nav>", "<div>", "<span>", "<section>"],
      correctAnswer: 0
    }
],
  "REST API Design": [ {
      id: "rest1",
      question: "Which HTTP method is used to update a resource completely?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correctAnswer: 2
    },
    {
      id: "rest2",
      question: "What does idempotent mean in REST?",
      options: [
        "Process only once",
        "Can be called many times with same effect",
        "Requires authentication",
        "Returns different result each call"
      ],
      correctAnswer: 1
    },
    {
      id: "rest3",
      question: "What status code is returned for a successful creation?",
      options: ["200", "201", "204", "400"],
      correctAnswer: 1
    },
    {
      id: "rest4",
      question: "Which header is used to indicate JSON content?",
      options: ["Accept: text/html", "Content-Type: application/json", "Auth: token", "Cache-Control"],
      correctAnswer: 1
    },
    {
      id: "rest5",
      question: "What is HATEOAS in REST?",
      options: [
        "Hypermedia links in responses",
        "High availability failover",
        "HTTP automated testing",
        "Hash-based authentication"
      ],
      correctAnswer: 0
    }
],
  "DevOps Essentials": [ {
      id: "devops1",
      question: "What does CI/CD stand for?",
      options: [
        "Continuous Integration/Continuous Development",
        "Continuous Integration/Continuous Deployment",
        "Code Integration/Code Deployment",
        "Continuous Inspection/Continuous Delivery"
      ],
      correctAnswer: 1
    },
    {
      id: "devops2",
      question: "Which tool is used for container orchestration?",
      options: ["Docker", "Kubernetes", "Jenkins", "Ansible"],
      correctAnswer: 1
    },
    {
      id: "devops3",
      question: "What does infrastructure-as-code enable?",
      options: [
        "Manual server setup",
        "Programmatic infrastructure management",
        "CSS in cloud environments",
        "Software distribution only"
      ],
      correctAnswer: 1
    },
    {
      id: "devops4",
      question: "Which tool automates configuration management?",
      options: ["Git", "Terraform", "Ansible", "Node.js"],
      correctAnswer: 2
    },
    {
      id: "devops5",
      question: "What is blue-green deployment?",
      options: [
        "Two color-themed UIs",
        "Switch traffic between identical environments",
        "Single-server deployment",
        "Manual release process"
      ],
      correctAnswer: 1
    }
],
  "Data Science with R": [  {
      id: "dstr1",
      question: "Which package is widely used for data manipulation in R?",
      options: ["ggplot2", "dplyr", "caret", "shiny"],
      correctAnswer: 1
    },
    {
      id: "dstr2",
      question: "Which function is used to read CSV files?",
      options: ["read.csv()", "pd.read_csv()", "import.csv()", "open.csv()"],
      correctAnswer: 0
    },
    {
      id: "dstr3",
      question: "What does ggplot2 specialize in?",
      options: [
        "Statistical modeling",
        "Web scraping",
        "Data visualization",
        "Machine translation"
      ],
      correctAnswer: 2
    },
    {
      id: "dstr4",
      question: "Which data structure holds rows and columns like a table?",
      options: ["Vector", "List", "Matrix", "Data frame"],
      correctAnswer: 3
    },
    {
      id: "dstr5",
      question: "Which function gives summary statistics?",
      options: ["summary()", "describe()", "inspect()", "evaluate()"],
      correctAnswer: 0
    }
],
  "Natural Language Processing": [  {
      id: "nlp1",
      question: "What is tokenization?",
      options: [
        "Splitting text into smaller units",
        "Translating text",
        "Removing stopwords",
        "Stemming words"
      ],
      correctAnswer: 0
    },
    {
      id: "nlp2",
      question: "What does lemmatization do?",
      options: [
        "Converts words to their base form",
        "Counts word frequency",
        "Splits sentences",
        "Encodes text"
      ],
      correctAnswer: 0
    },
    {
      id: "nlp3",
      question: "Which model uses attention mechanisms?",
      options: ["Naive Bayes", "Transformer", "SVM", "LSTM"],
      correctAnswer: 1
    },
    {
      id: "nlp4",
      question: "What is BLEU score used for?",
      options: [
        "Sentiment analysis",
        "Machine translation evaluation",
        "Topic modeling",
        "Text summarization"
      ],
      correctAnswer: 1
    },
    {
      id: "nlp5",
      question: "What does NER stand for?",
      options: [
        "Named Entity Recognition",
        "Neural Event Routing",
        "Natural Entity Ranking",
        "Network Embedded Representation"
      ],
      correctAnswer: 0
    }
],
  "Cloud Computing Fundamentals": [ {
      id: "ccf1",
      question: "Which cloud model provides servers, storage, and networking?",
      options: [
        "IaaS",
        "PaaS",
        "SaaS",
        "DaaS"
      ],
      correctAnswer: 0
    },
    {
      id: "ccf2",
      question: "Which provider is NOT a major public cloud?",
      options: ["AWS", "Azure", "Salesforce", "Google Cloud"],
      correctAnswer: 2
    },
    {
      id: "ccf3",
      question: "What does autoscaling do?",
      options: [
        "Manually adjusts server size",
        "Automatically adjusts resource capacity",
        "Scans for vulnerabilities",
        "Balances UI components"
      ],
      correctAnswer: 1
    },
    {
      id: "ccf4",
      question: "Which service model includes runtime and middleware?",
      options: ["IaaS", "PaaS", "SaaS", "CaaS"],
      correctAnswer: 1
    },
    {
      id: "ccf5",
      question: "What is a benefit of multi-tenancy?",
      options: [
        "Single user per server",
        "Resource sharing across users",
        "Dedicated hardware per customer",
        "Faster local disk"
      ],
      correctAnswer: 1
    }
]
};

const QuizPage = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentSet, setCurrentSet] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const chosen = localStorage.getItem('interest') || 'Machine Learning Basics';
    setTopic(chosen);
    if (questionsByTopic[chosen]) {
      setQuestions(questionsByTopic[chosen]);
    } else {
      alert(`No quiz found for "${chosen}"`);
      navigate('/');
    }
  }, [navigate]);

  const currentQ = questions[currentSet];

  const handleAnswerSelect = (qId, index) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: index
    }));
  };

  const handleNext = () => {
    if (typeof selectedAnswers[currentQ.id] === 'undefined') {
      alert("Please select an answer first.");
      return;
    }

    if (currentSet < questions.length - 1) {
      setCurrentSet(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });

    // Save score to localStorage and go to results page
    localStorage.setItem('quizScore', score);
    localStorage.setItem('quizTopic', topic);
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent bg-clip-text mb-2">
            {`Quiz: ${topic}`}
          </h1>
          <p className="text-sm text-gray-400">Question {currentSet + 1} of {questions.length}</p>
        </div>

        {currentQ && (
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
            <h2 className="text-xl mb-4">{currentQ.question}</h2>
            <div className="space-y-4">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(currentQ.id, idx)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedAnswers[currentQ.id] === idx
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next */}
        <div className="flex justify-between mt-6 max-w-3xl mx-auto">
          <button
            className="bg-gray-800 px-4 py-2 rounded-lg text-white hover:bg-gray-700 disabled:opacity-50"
            onClick={() => setCurrentSet(prev => Math.max(prev - 1, 0))}
            disabled={currentSet === 0}
          >
            ⬅ Prev
          </button>
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            {currentSet === questions.length - 1 ? 'Submit' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
