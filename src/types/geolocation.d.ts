/** Geolocation of the homey **/
export interface Geolocation {
    coordinates: GeolocationCoordinates;
    details?: GeolocationDetails;
}

export interface GeolocationCoordinates {
    latitude: number;
    longitude: number;
    accuracy: number;
}

export interface GeolocationDetails {
    /** Yr: category of the location
     *  example:
     {
            "id": "CH10",
            "name": "Part of a city"
        }
     **/
    category: GeolocationCategory;

    /** Yr: id of the location, example: "1-73823" **/
    id: string;

    /** Name of the location, example: "Grünerløkka" in Oslo**/
    name: string;

    /** Elevation of the location, example: "19"**/
    elevation: number;

    /** Timezone in tz database for the location, example: "Europe/Oslo", see also https://en.wikipedia.org/wiki/List_of_tz_database_time_zones**/
    timeZone: string;

    /** Country in ISO 3166-1 alpha-2 codes format for the location,
     *  See also https://en.wikipedia.org/wiki/ISO_3166-1
     *  example:
     {
            "id": "NO",
            "name": "Norway"
        }
     **/
    country: GeolocationRegion;

    /** Region in ISO_3166-2 format for the location
     *  Optional, see also https://en.wikipedia.org/wiki/ISO_3166-2,
     *  example:
     {
            "id": "NO/03",
            "name": "Oslo"
        }
     **/
    region?: GeolocationRegion;

    /** Region in ISO_3166-2 format for the location
     *  Optional, see also https://en.wikipedia.org/wiki/ISO_3166-2
     *  example:
     {
            "id": "NO/03/0301",
            "name": "Oslo"
        }
     **/
    subregion?: GeolocationRegion;
}

export interface GeolocationCategory {
    id?: string;
    name?: string;
}

export interface GeolocationRegion {
    id: string;
    name: string;
}