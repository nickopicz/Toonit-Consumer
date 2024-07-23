import { Dimensions } from "react-native";

export const Colors = {
    Background: "#0095FF",
    Trim: "#e8810c",
    Black: "#000000",
    White: "#ffffff",
    Gray: "#5A5A5A"

};

export const Dim = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
};

export const aspectRatio = Dim.height / Dim.width;

export const Font = {
    h1: {
        size: 36,
        family: "Montserrat",
    },
    h2: {
        size: 32,
        family: "Montserrat",
    },
    h3: {
        size: 28,
        family: "Montserrat",
    },
    h4: {
        size: 24,
        family: "Montserrat",
    },
    p1: {
        size: 20,
        family: "Montserrat",
    },
    p2: {
        size: 18,
        family: "Montserrat",
    },
    p3: {
        size: 14,
        family: "Montserrat",
    },
    p4: {
        size: 12,
        family: "Montserrat",
    },
};
