import React, { useRef, useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { InputLabel, Select, FormControl, MenuItem, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';

import { startProgress, completeProgress } from 'redux/module/progress';

import PlaceDetails from 'components/place/PlaceDetail';
import './Google.scoped.scss';
import ReviewsDialog from 'components/place/ReviewsDialog';

const YOUR_API_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY;
const srcUrl = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&libraries=places`;
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function useScript(src: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
    }

    const handleLoad = () => setLoading(false);
    const handleError = (error: any) => setError(error);

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [src]);

  return [loading, error];
}

export default function MapGoogle() {
  const [loading, error] = useScript(srcUrl);
  const refMap = useRef(null);
  const refButton = useRef(null);
  const refInput = useRef(null);
  const [mapObject, setMapObject] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [placeList, setPlaceList] = useState<google.maps.places.PlaceResult[]>([]);
  const [filteredPlaceList, setFilteredPlaceList] = useState<google.maps.places.PlaceResult[]>([]);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [centerMarker, setCenterMarker] = useState<google.maps.Marker | null>(null);
  const [ratingCriteria, setRatingCriteria] = useState<number>(4.2);
  const [reviewCountCriteria, setReviewCountCriteria] = useState<number>(20);
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!loading && !error) {
      const node = refMap.current;
      const nodeButton = refButton.current;
      const nodeInput = refInput.current;
      if (!node) return;

      const center: google.maps.LatLngLiteral = { lat: 37.5334253, lng: 127.0749127 };
      const map = new google.maps.Map(node as HTMLElement, {
        center,
        zoom: 18,
      });
      const infoWindow = new google.maps.InfoWindow({ pixelOffset: new google.maps.Size(0, -30) });
      setMapObject(() => map);
      setInfoWindow(() => infoWindow);
      moveCurrentLocation(map, infoWindow);

      if (nodeButton) {
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(nodeButton);
      }
      if (nodeInput) {
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(nodeInput);
        const autocomplete = new google.maps.places.Autocomplete(nodeInput, {
          // types: ['geocode',],
          componentRestrictions: { country: 'kr' },
          fields: ['address_components', 'geometry', 'icon', 'name'],
          strictBounds: false,
        });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          // 중심 위치 마커 찍을 수도 있겠음
          // const lat = place.geometry?.location?.lat();
          // const lng = place.geometry?.location?.lng();
          if (place.geometry?.location) {
            map.setCenter(place.geometry.location);
            getStoresInMap(map);
          }
        });
      }
    }
  }, [loading, error]);

  useEffect(() => {
    const filteredPlaceList = placeList.filter(result => {
      const { rating, user_ratings_total } = result;
      if (!rating || !user_ratings_total) return false;

      const goodPlace = rating >= ratingCriteria && user_ratings_total >= reviewCountCriteria;
      return goodPlace;
    });
    setFilteredPlaceList(filteredPlaceList);

    markers.forEach(marker => {
      marker.setVisible(false);
      marker.setMap(null);
    });

    const newMarkers: google.maps.Marker[] = [];
    filteredPlaceList.forEach(place => {
      if (!place.geometry || !place.geometry.location) return;
      const markerPosition: google.maps.LatLngLiteral = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      const marker = new google.maps.Marker({
        map: mapObject,
        position: markerPosition,
        title: place.name,
      });
      marker.addListener('click', () => {
        if (!place.place_id) return;
        openReviewDialog(place.place_id);
      });
      newMarkers.push(marker);
    });
    setMarkers(newMarkers);
  }, [placeList, ratingCriteria, reviewCountCriteria]);

  const moveCurrentLocation = (map: google.maps.Map, infoWindow: google.maps.InfoWindow) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(pos);
          getStoresInMap(map);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter()!);
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter()!);
    }
  };
  const handleLocationError = (
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng,
  ) => {
    if (!mapObject) return;

    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(mapObject);
  };
  const searchStore = (placeId: string) => {
    if (!mapObject) return;

    const request = {
      placeId,
      fields: [
        'name',
        'formatted_phone_number',
        'geometry',
        'opening_hours',
        'photo',
        'address_components',
        // 평가항목
        'rating',
        'reviews',
        'user_ratings_total',
      ],
    };

    const service = new google.maps.places.PlacesService(mapObject);
    service.getDetails(request, callback);

    function callback(place: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace(place);
      }
    }
  };
  const getStoresInMap = (map?: google.maps.Map | undefined) => {
    if (!map) return;
    emptyPlace();
    if (centerMarker) {
      centerMarker.setMap(null);
    }
    const newMarker = new google.maps.Marker({
      map: mapObject,
      position: map.getCenter(),
      title: '검색 위치',
      icon: 'https://aufebucket.s3.ap-northeast-2.amazonaws.com/logo/Flag.webp',
    });
    setCenterMarker(newMarker);

    const request = {
      bounds: map.getBounds(),
      query: 'restaurant food',
    };
    const bounds = map.getBounds();
    dispatch(startProgress());
    let timeout = setTimeout(() => {
      dispatch(completeProgress());
    }, 2000);
    const service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
    function callback(
      placeResults: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus,
      pagination: google.maps.places.PlaceSearchPagination | null,
    ) {
      if (placeResults && status == google.maps.places.PlacesServiceStatus.OK) {
        const inboundPlace = placeResults.filter(place => {
          return place.geometry?.location ? bounds?.contains(place.geometry?.location) : false;
        });
        setPlaceList(previousValue => {
          return [...previousValue, ...inboundPlace];
        });
        pagination?.nextPage();
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          dispatch(completeProgress());
        }, 2000);
      } else {
        dispatch(completeProgress());
        toast.error('검색 실패');
      }
    }
  };
  const openReviewDialog = (place_id: string) => {
    setSelectedPlace(null);
    searchStore(place_id);
    setReviewDialogOpen(true);
  };
  const openTooltip = (place: google.maps.places.PlaceResult) => {
    if (!infoWindow) return;
    infoWindow.setPosition(place.geometry?.location);
    infoWindow.setContent(place.name);

    infoWindow.open(mapObject);
  };

  const closeTooltip = () => {
    if (!infoWindow) return;
    infoWindow?.close();
  };
  const emptyPlace = () => {
    markers.forEach(marker => {
      marker.setMap(null);
    });
    setMarkers(() => []);
    setPlaceList(() => []);
  };

  if (error) return <p>오류!</p>;
  if (loading) return <p>로딩 중 ...</p>;
  return (
    <>
      <Grid container className='place__container'>
        <Grid xs={6} padding={2}>
          <FormControl size='small'>
            <InputLabel id='demo-simple-select-label'>
              <StarImage /> 별점
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={ratingCriteria}
              label='별점'
              onChange={event => {
                setRatingCriteria(Number(event.target.value));
              }}
              sx={{ width: 100 }}
            >
              <MenuItem value={4.0}>
                <StarImage />
                4.0
              </MenuItem>
              <MenuItem value={4.1}>
                <StarImage />
                4.1
              </MenuItem>
              <MenuItem value={4.2}>
                <StarImage />
                4.2
              </MenuItem>
              <MenuItem value={4.3}>
                <StarImage />
                4.3
              </MenuItem>
              <MenuItem value={4.4}>
                <StarImage />
                4.4
              </MenuItem>
              <MenuItem value={4.5}>
                <StarImage />
                4.5
              </MenuItem>
              <MenuItem value={4.6}>
                <StarImage />
                4.6
              </MenuItem>
              <MenuItem value={4.7}>
                <StarImage />
                4.7
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={6} padding={2}>
          <FormControl size='small'>
            <InputLabel id='demo-simple-select-label'>최소 평가수</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={reviewCountCriteria}
              label='평가수'
              onChange={event => {
                setReviewCountCriteria(Number(event.target.value));
              }}
              sx={{ width: 100 }}
            >
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={70}>70</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {filteredPlaceList.map((place, index) => {
          return (
            <Grid xs={12} key={index}>
              <PlaceDetails
                placeInfo={place}
                onClick={placeInfo => {
                  if (!placeInfo.place_id) return;
                  openReviewDialog(placeInfo.place_id);
                }}
                onHover={placeInfo => {
                  openTooltip(placeInfo);
                  if (mapObject && placeInfo.geometry?.location) {
                    mapObject.setCenter(placeInfo.geometry?.location);
                  }
                }}
              ></PlaceDetails>
            </Grid>
          );
        })}
      </Grid>
      <div ref={refMap} className='map'>
        {/* <button ref={refButton} className='custom-map-control-button' onClick={() => getStoresInMap(mapObject!)}>
          주변 가게 검색
        </button> */}
        <Button variant='contained' size='small' ref={refButton} onClick={() => getStoresInMap(mapObject!)}>
          주변 가게 검색
        </Button>
        <input ref={refInput} id={'google_autocomplete'} className='map__autocomplete'></input>
      </div>

      <ReviewsDialog
        open={reviewDialogOpen}
        onClose={() => {
          setReviewDialogOpen(false);
        }}
        name={selectedPlace?.name || ''}
        photos={selectedPlace?.photos || []}
        reviews={selectedPlace?.reviews || []}
        openingHour={selectedPlace?.opening_hours}
        address={addressToString(selectedPlace?.address_components || []) || ''}
      />
    </>
  );
}

function StarImage() {
  return <img width={14} height={14} src='https://maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_14.png' />;
}
function addressToString(address: google.maps.GeocoderAddressComponent[]) {
  let resultString = '';
  address.map(addressObject => {
    resultString += addressObject.long_name + ' ';
  });
  return resultString;
}
