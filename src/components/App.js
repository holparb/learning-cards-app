import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import store from "../redux/store"
import CardList from "./CardList";
import AddOrEditCard from "./AddEditCard";

//Define the root navigation stack
const RootStack = createStackNavigator(
    {
        List: CardList,
        AddEdit: AddOrEditCard
    },
    {
      initialRouteName: "List"
    }
);

//Create an AppContainer component from the root stack
let Navigation = createAppContainer(RootStack);

export default class App extends React.Component {
    
    render() {
        return(
            //Wrap the Navigation component with the HOC Provider
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
};

