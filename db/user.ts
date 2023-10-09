export const user = {
  id: 1,
  name: "Chris Miguel",
  position: "freelancer",
  imgUrl: "person-chris.png",
};

export const userPaymentHistory = {
  "1M": {
    labels: ["Feb 1", "Feb 8", "Feb 15", "Feb 22", "Feb 28"],
    datasets: [
      {
        label: "1M",
        data: [40.5, 50.3, 55.5, 60.6, 80.2],
        backgroundColor: "#0AAF60",
        borderColor: "#0AAF60",
      },
    ],
  },
  "3M": {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "3M",
        data: [330, 320, 335],
        backgroundColor: "#3981F7",
        borderColor: "#3981F7",
      },
    ],
  },
  "6M": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "6M",
        data: [300, 280, 290, 285, 310, 315],
        backgroundColor: "#FFCA29",
        borderColor: "#FFCA29",
      },
    ],
  },
  "1Y": {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "1Y",
        data: [300, 280, 290, 285, 310, 315, 320, 315, 300, 350, 400, 410],
        backgroundColor: "#F44236",
        borderColor: "#F44236",
      },
    ],
  },
};

export const userTransactionHistory = [
  {
    id: 1,
    imgUrl: "/assets/home/action-person1.png",
    personName: "Cody Fisher",
    company: "Louis Vuitton",
    amount: "1,546",
    date: "1 Jun 2023",
  },
  {
    id: 2,
    imgUrl: "/assets/home/action-person2.png",
    personName: "Esther Howard",
    company: "Starbucks",
    amount: "1,546",
    date: "1 Jul 2023",
  },
  {
    id: 3,
    imgUrl: "/assets/home/action-person3.png",
    personName: "Wade Warren",
    company: "Louis Vuitton",
    amount: "1,546",
    date: "1 Aug 2023",
  },
  {
    id: 4,
    imgUrl: "/assets/home/action-person4.png",
    personName: "Brooklyn Simmons",
    company: "Sony",
    amount: "1,546",
    date: "1 Sep 2023",
  },
  {
    id: 5,
    imgUrl: "/assets/home/action-person5.png",
    personName: "Ralph Edwards",
    company: "IBM",
    amount: "1,546",
    date: "1 Oct 2023",
  },
  {
    id: 6,
    imgUrl: "/assets/home/action-person6.png",
    personName: "Dianne Russell",
    company: "The Walt Disney Company",
    amount: "1,546",
    date: "1 Nov 2023",
  },
];
