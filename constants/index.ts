import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";
import security from "@/assets/icons/security.png";
import user from "@/assets/icons/user.png";
import timeLeft from "@/assets/icons/time-left.png";
import mylocation from "@/assets/icons/my-location.png";

// Images
import check from "@/assets/images/check.png";
import getStarted from "@/assets/images/get-started.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signUpCar from "@/assets/images/signup-car.png";
import checkDocument from "@/assets/images/check-document.png";
import winterPicture from "@/assets/images/winterPicture.png";

import orderMap from "@/assets/gif-images/order-map.gif";
// gif-images
import orderFood from "@/assets/gif-images/order-food-rafiki.gif";
import orderRide from "@/assets/gif-images/order-ride-rafiki.gif";
import gbConnection from "@/assets/gif-images/bg-connection.jpg";
import signUp_Car from "@/assets/gif-images/signUp-car.jpg";
import getRide from "@/assets/gif-images/get-ride.gif";
import orderFood_restaurant from "@/assets/gif-images/order-food-restaurant.gif";
import destination from "@/assets/gif-images/checked.gif";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  getStarted,
  signUpCar,
  check,
  checkDocument,
  noResult,
  message,
  orderMap,
  orderRide,
  orderFood,
  gbConnection,
  signUp_Car,
  winterPicture,
};

export const gifImages = {
  getRide,
  orderFood_restaurant,
};

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
  security,
  user,
  timeLeft,
  destination,
  mylocation,
};

export const onboarding = [
  {
    id: 1,
    title: "Localisez votre chauffeur en temps réel",
    description:
      "Repérez les chauffeurs proches de vous grâce à notre carte interactive et commandez votre course en toute simplicité.",
    image: images.orderMap,
  },
  {
    id: 2,
    title: "Choisissez votre véhicule idéal",
    description:
      "Sélectionnez le type de véhicule qui correspond le mieux à vos besoins et voyagez en toute tranquillité",
    image: images.orderRide,
  },
  {
    id: 3,
    title: "Commander votre repas facilement",
    description:
      "Commandez facilement vos repas préférés directement depuis notre application et faites-vous livrer en quelques minutes seulement, selon la disponibilité.",
    image: images.orderFood,
  },
];

export const data = {
  onboarding,
};
