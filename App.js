import React, { Component } from 'react';
 
import { StyleSheet, View,  Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, Linking } from 'react-native';
 
export default class App extends Component{
 
    constructor()
    {
      super();
    
      this.state = { 
 
      GridColumnsValue: true,
 
      ButtonDefaultText: 'CHANGE TO GRIDVIEW',
 
      isLoading: true
        
     }
    }
    
    componentDidMount() {
        
           return fetch('https://api.publicapis.org/entries')
             .then((response) => response.json())
             .then((responseJson) => {
               this.setState({
                 isLoading: false,
                 dataSource: responseJson.entries
               }, function() {
                 // In this block you can do something with new state.
               });
             })
             .catch((error) => {
               console.error(error);
             });
         }
 
    ChangeGridValueFunction =()=> {
        
        if(this.state.GridColumnsValue === true)
 
        {
            this.setState({
                
                GridColumnsValue: false,
                ButtonDefaultText : "CHANGE TO LISTVIEW"
                
            })
        }
        else{
 
            this.setState({
                
                GridColumnsValue: true,
                ButtonDefaultText : "CHANGE TO GRIDVIEW"
                
            })
 
        }
             
         }
 
    render() {
 
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
              </View>
            );
          }
 
      return (
    
   <View style={styles.MainContainer}>
    
    
    <TouchableOpacity
          style={styles.ButtonStyle}
          activeOpacity = { .8}
          onPress={this.ChangeGridValueFunction} >
 
            <Text style={styles.ButtonInsideTextStyle}> {this.state.ButtonDefaultText} </Text>
            
    </TouchableOpacity>
		

	
         <FlatList
         
            data={ this.state.dataSource }
    
            renderItem={({item}) => <View style={{flex:1, flexDirection: 'column', margin:1}}> 
 
            <Text onPress={()=> Linking.openURL(item.Link)} style={styles.ItemTextStyle} numberOfLines={2} >{item.Description}</Text>

            </View> 
            
            }
 
            numColumns = { this.state.GridColumnsValue ? 1 : 2 }
 
            key = {( this.state.GridColumnsValue ) ? 'ONE COLUMN' : 'TWO COLUMN' }
 
            keyExtractor={(item, index) => index}
    
           />
           
  </View>
              
      );
    }
   }
    
   const styles = StyleSheet.create({
    
   MainContainer :{
  
   justifyContent: 'center',
   flex:1,
},
  
   ItemTextStyle: {
      
      margin: 5,
      height: 80,
      color: '#fff',
      padding: 20,
      fontSize: 15,
      textAlign: 'left',
      backgroundColor: '#4CAF50',
      borderRadius: 10
 },
 
    ButtonStyle: {
         marginBottom: 10,
           paddingTop:15,
           paddingBottom:15,
           backgroundColor:'#FF9800',
           width: '100%',
           height: 50
         },
        
    ButtonInsideTextStyle:{
           color:'#fff',
           textAlign:'center',
    }
    
   });