export const cardReport = {
  "1M": {
    labels: [
      "Mar 1",
      "Mar 6",
      "Mar 11",
      "Mar 18",
      "Mar 23",
      "Mar 27",
      "Mar 31",
    ],
    datasets: [
      {
        label: "1M",
        data: [60.5, 50.3, 60.5, 51.6, 62.2, 53.6, 63.7],
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

export const cardTransaction = [
  {
    id: 1,
    name: "Dropbox",
    iconUrl: "/assets/cards/action1.png",
    date: "Mar 22, 2023",
    amount: 204,
  },
  {
    id: 2,
    name: "Asana",
    iconUrl: "/assets/cards/action2.png",
    date: "Feb 5, 2023",
    amount: 120,
  },
  {
    id: 3,
    name: "Github",
    iconUrl: "/assets/cards/action3.png",
    date: "Feb 1, 2023",
    amount: 80,
  },
  {
    id: 4,
    name: "Loom",
    iconUrl: "/assets/cards/action4.png",
    date: "Jan 27, 2023",
    amount: 65,
  },
  {
    id: 5,
    name: "Zendesk",
    iconUrl: "/assets/cards/action5.png",
    date: "Jan 23, 2023",
    amount: 40,
  },
];

export const activeCard = {
  cardNumber: "3481 2982 2821 5680",
  balance: "5,340",
  currency: "USD",
  statusCard: "03/27",
};
