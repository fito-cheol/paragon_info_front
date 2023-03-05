import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = {
  componentRestrictions: { country: 'kr' },
  fields: ['address_components', 'geometry', 'icon', 'name'],
  strictBounds: false,
};

interface Props {
  onNewBoundary: (boundary: GeolocationCoordinates) => void;
}

export default function MapAutoComplete({ onNewBoundary }: Props) {
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');
  return (
    <Autocomplete
      freeSolo
      id='free-solo-2-demo'
      disableClearable
      options={searchOptions}
      renderInput={params => (
        <TextField
          {...params}
          label='장소 검색'
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          value={searchWord}
          onChange={event => {
            setSearchWord(event.target.value);
          }}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              // Prevent's default 'Enter' behavior.
              event.preventDefault();
              // your handler code
              // const autocomplete = new google.maps.places.Autocomplete(searchWord, options);
            }
          }}
        />
      )}
    />
  );
}
function makeBound(southwest: google.maps.LatLng, northeast: google.maps.LatLng) {
  return new google.maps.LatLngBounds(southwest, northeast);
}
