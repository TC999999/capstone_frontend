const TEST_USER = {
  username: "u1",
  firstName: "fn1",
  lastName: "ln1",
  email: "testemail1@gmail.com",
  address: "100 address",
  zipCode: "11111",
  regionOrState: "state1",
  city: "city1",
  country: "country1",
  latitude: "10.99876",
  longitude: "-99.99981",
  isAdmin: false,
  isFlagged: false,
  items: [
    {
      itemID: 1,
      name: "i1",
      initialPrice: 100,
      imageURL: "test_url_1",
      condition: "great",
      description: "test item",
    },
    {
      itemID: 2,
      name: "i2",
      initialPrice: 100,
      imageURL: "test_url_2",
      condition: "great",
      description: "test item",
    },
  ],
  reviews: [],
  reports: [],
  pastPurchases: [
    {
      purchaseID: 1,
      itemName: "i4",
      sellerUser: "u3",
      imageURL: "test_url_4",
      price: 150,
      soldAt: expect.any(Date),
      fromFlaggedUser: false,
    },
  ],
};

const TEST_ITEM = {
  id: 1,
  name: "i1",
  imageURL: "test_url_1",
  initialPrice: 100,
  condition: "great",
  description: "test item",
  sellerUser: "u1",
  isSold: false,
  types: [{ id: 1, name: "electronics" }],
  location: {
    city: "city1",
    address: "100 address",
    latitude: "10.99876",
    longitude: "-99.99981",
    regionOrState: "state1",
    country: "country1",
    zipCode: "11111",
  },
};

const TEST_ITEMS = [
  {
    id: 3,
    name: "i3",
    imageURL: "test_url_3",
    initialPrice: 100,
    condition: "great",
    description: "test item",
    sellerUser: "u2",
    types: [
      { id: 1, name: "electronics" },
      { id: 3, name: "books" },
    ],
    location: {
      city: "city2",
      regionOrState: "state2",
      country: "country2",
      zipCode: "22222",
    },
  },
  {
    id: 2,
    name: "i2",
    imageURL: "test_url_2",
    initialPrice: 100,
    condition: "great",
    description: "test item",
    sellerUser: "u1",
    types: [
      { id: 1, name: "electronics" },
      { id: 2, name: "movies" },
    ],
    location: {
      city: "city1",
      regionOrState: "state1",
      country: "country1",
      zipCode: "11111",
    },
  },
  {
    id: 1,
    name: "i1",
    imageURL: "test_url_1",
    initialPrice: 100,
    condition: "great",
    description: "test item",
    sellerUser: "u1",
    types: [{ id: 1, name: "electronics" }],
    location: {
      city: "city1",
      regionOrState: "state1",
      country: "country1",
      zipCode: "11111",
    },
  },
];

const TEST_MESSAGE = {
  id: 3,
  from: "u2",
  to: "u1",
  itemID: 1,
  itemName: "i3",
  body: "test body",
  createdAt: "2024-07-09 14:23:43.469126-04",
};

const TEST_MESSAGE_2 = {
  id: 3,
  from_username: "u2",
  to_username: "u1",
  itemID: 1,
  item_name: "i3",
  body: "test body",
  sent_at: "2024-07-09 14:23:43.469126-04",
};

const TEST_MESSAGES = {
  conversation: [
    {
      id: 2,
      from_username: "u3",
      to_username: "u1",
      item_name: "i4",
      itemID: 4,
      body: "test body",
      sent_at: "2024-07-09 14:23:43.469126-04",
    },
    {
      id: 1,
      from_username: "u1",
      to_username: "u3",
      item_name: "i4",
      itemID: 4,
      body: "test body",
      sent_at: "2024-07-09 14:23:43.469126-04",
    },
  ],
};

const TEST_REVIEW = {
  id: 1,
  reviewed: "u3",
  reviewer: "u1",
  rating: 10,
  body: "test review",
  madeAt: "2024-07-09 14:23:43.469126-04",
};

const TEST_REPORT = {
  id: 1,
  reportedUser: "u2",
  reporterUser: "u1",
  body: "test body",
  madeAt: "2024-07-09 14:23:43.469126-04",
  isCleared: false,
};

const TEST_REPORTS = [
  {
    id: 1,
    reportedUser: "u2",
    reporterUser: "u1",
    body: "test body",
    madeAt: "2024-07-09 14:23:43.469126-04",
    isCleared: false,
  },
  {
    id: 2,
    reportedUser: "u1",
    reporterUser: "u2",
    body: "test body",
    madeAt: "2024-07-09 14:23:43.469126-04",
    isCleared: false,
  },
];

const TEST_PURCHASE = {
  purchaseID: 1,
  itemName: "i4",
  sellerUser: "u3",
  imageURL: "test_url_4",
  price: 150,
  soldAt: "2024-07-09 14:23:43.469126-04",
  fromFlaggedUser: false,
};

module.exports = {
  TEST_USER,
  TEST_ITEM,
  TEST_ITEMS,
  TEST_MESSAGE,
  TEST_MESSAGE_2,
  TEST_MESSAGES,
  TEST_REPORT,
  TEST_REPORTS,
  TEST_REVIEW,
  TEST_PURCHASE,
};
