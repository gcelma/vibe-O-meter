import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ALL_POLLS = gql`
    query AllPolls {
        getPolls {
            id
            name
            date
            owner
            good
            mid
            bad
    }     
  }
`

export default function Polls () {
    const { data, loading, error } = useQuery(ALL_POLLS);

    if(loading) {
        return <p>loading</p>
    }

    if(error) {
        return <p>error</p>;
    }

    if(data) {
        console.log(data);
        return <div>
        <p>all pools from user:</p>
    </div>
    }
}