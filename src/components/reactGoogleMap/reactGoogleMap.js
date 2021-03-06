import React, {Component} from 'react';

import { compose, withProps, withState, withHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { apiKey } from "../../keys";
import Spinner from "../spinner";

const MyGoogleMap = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `300px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withState('zoom', 'onZoomChange', 8),
    withHandlers(() => {
        const refs = {
            map: undefined,
        };
        return {
            onMapMounted: () => ref => {
                refs.map = ref;
            },
            onZoomChanged: ({ onZoomChange }) => () => {
                onZoomChange(refs.map.getZoom())
            },
        }
    }),
    withScriptjs,
    withGoogleMap
)(props => {

    return (
        <GoogleMap
            center={props.center}
            defaultCenter={props.center}
            zoom={props.zoom}
            ref={props.onMapMounted}
            onZoomChanged={props.onZoomChanged}
        >
            <Marker
                position={{ lat: props.center.lat, lng: props.center.lng }}
            >
            </Marker>
        </GoogleMap>
    );
});

export default class ReactGoogleMap extends Component {

    render() {
        if (!this.props.lati || !this.props.longi) {
            return <Spinner />
        }
        return (
            <div className="h-300 w-300 border border-white rounded">
                <MyGoogleMap
                    center ={ { lat: this.props.lati, lng: this.props.longi } }
                    {...this.props}/>
            </div>
        );
    };
}