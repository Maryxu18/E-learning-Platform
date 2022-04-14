const messages = [
  {
    _id: 1,
    text: "Here is a car",
    createdAt: new Date(Date.UTC(2021, 5, 13, 16, 20, 0)),
    user: {
      _id: 1,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/nature",
    },
    image: "https://image.flaticon.com/icons/png/512/741/741460.png",
  },
  {
    _id: 2,
    text: "Like this zebra?",
    createdAt: new Date(Date.UTC(2021, 5, 15, 17, 20, 0)),
    user: {
      _id: 2,
      name: "Ronnie O'Sullivan",
      avatar: "https://placeimg.com/140/140/tech",
    },
    video: "https://media.giphy.com/media/3o6ZthZjk09Xx4ktZ6/giphy.mp4",
  },
  {
    _id: 3,
    text: `http://www.google.com or http://www.facebook.com are clickable`,
    createdAt: new Date(Date.UTC(2021, 6, 1, 18, 45, 0)),
    user: {
      _id: 1,
      name: "Ronnie O'Sullivan",
      avatar: "https://placeimg.com/140/140/nature",
    },
  },
];

export default messages;
