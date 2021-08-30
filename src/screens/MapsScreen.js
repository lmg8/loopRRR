import React, {useState, useEffect} from "react";
import { View, Dimensions } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { set } from "react-native-reanimated";
import MapView, { Marker } from 'react-native-maps';
import { OpenMapDirections } from 'react-native-navigation-directions';
import {GOOGLE_MAPS_API_KEY} from "@env";

// https://dev.to/kpete2017/how-to-create-a-restaurant-finder-app-in-react-native-part-2-56gj

let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.28; //Increase or decrease the zoom level dynamically
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function ({ route, navigation }) {
  const { keyword } = route.params;
  const [loading, setLoading] = useState(false);
  const {isDarkmode, setTheme} = useTheme();
    const [state, setState] = useState({
        latitude: 0,
        longitude: 0,
        restaurantList: [],
        //keyword: '%27recycle%20drop-off%27',
        hasLocationPermission: false
    });
    const [places, setPlace] = useState([]);

  const _callShowDirections = coordinate => {
    const startPoint = {
      longitude: state.longitude,
      latitude: state.latitude
    } 
    const transportPlan = 'd';
    OpenMapDirections(startPoint, coordinate, transportPlan).then(res =>
      console.log(res)
    );
  }

    const getLocationAsync = async () => {
      
        let { status } = await Location.requestForegroundPermissionsAsync( );
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          console.log(location);
          setState(prevState => ({...prevState,
            hasLocationPermission: true,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }));
        }
        else {
          alert('Location permission not granted');
        }
      };

      // https://handyopinion.com/fetch-nearest-places-in-react-native-using-google-places-api/
      const fetchNearestPlacesFromGoogle = () => {
        console.log(navigation)
        //const latitude = 25.0756; // you can update it with user's latitude & Longitude
        //const longitude = 55.1454;
        let radMetter = 10 * 1000; // Search withing 20 KM radius
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + state.latitude + ',' + state.longitude + '&radius=' + radMetter + '&keyword=' + keyword + '&key=' + GOOGLE_MAPS_API_KEY
        console.log(url);
        fetch(url)
          .then(res => {
            console.log('got here')
            return res.json()
          })
          .then(res => {
            console.log('got here 1')
            for(let googlePlace of res.results) {
              var place = {}
              var lat = googlePlace.geometry.location.lat;
              var lng = googlePlace.geometry.location.lng;
              var coordinate = {
                latitude: lat,
                longitude: lng,
              }

            //   var gallery = []

            //   if (googlePlace.photos) {
            //    for(let photo of googlePlace.photos) {
            //      var photoUrl = Urls.GooglePicBaseUrl + photo.photo_reference;
            //      gallery.push(photoUrl);
            //   }


              //place['placeTypes'] = googlePlace.types
              place['coordinate'] = coordinate
              place['placeId'] = googlePlace.place_id
              place['open']=googlePlace.opening_hours
              place['placeName'] = googlePlace.name
              //place['gallery'] = gallery

              //places.push(place);
              setPlace(prevArray=> [...prevArray, place])
            }
            // Do your work here with places Array
          })
          .catch(error => {
            console.log(error);
          });

      }


  // useEffect(() => {
  //       getLocationAsync();
  //       fetchNearestPlacesFromGoogle();

  // }, []);
  useEffect(() => {
    getLocationAsync();
  }, [])
  useEffect(() => {
    if(state.hasLocationPermission){
      fetchNearestPlacesFromGoogle();
    }     

  },[state.hasLocationPermission])


  return (
    <Layout>
      <TopNav
        middleContent="Location"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {state.hasLocationPermission ? (<MapView
            style={{height:'100%', width: '100%'}}
            apikey={GOOGLE_MAPS_API_KEY}
            provider="google"
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            onLongPress={e => _callShowDirections(e.nativeEvent.coordinate)}
            initialRegion={{
              latitude:state.latitude,
              longitude: state.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
        >
            {places.map((place, idx) => {
            // const { latitude, longitude } = place;
            //TODO: find nearby donation centres or recycle depots
            const latitude = place.coordinate.latitude;
            const longitude = place.coordinate.longitude;
            const title = place.placeName;

            let description2 =
                // 'Distance: ' +
                // distance +
                // '\n' +

                'Search for secret code! Long press pin for directions!';
            return (
                <Marker
                key={idx}
                coordinate={{ latitude, longitude }}
                title={title}
                description={description2}
                />
            );
            })}
        </MapView> ) : (<Text>getting your location...</Text>)}
        
      </View>
    </Layout>
  );
}
