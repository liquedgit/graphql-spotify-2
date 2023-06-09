import { mockServer } from "@graphql-tools/mock";

import { schema } from "../data/schema.mjs";

let cnt = 0;

const simpleMockServer = mockServer(schema, {
    String: () => 'loremipsum ' + (cnt++),
    Album: () => {
        return {
            name: () => {return 'Album#1'}
        };
    }
});

const result = simpleMockServer.query(`{
    queryArtists(byName:"Marilyn Manson") {
        name
        albums {
            name
            tracks {
                name
                artists { name }
            }
        }
    }
}`);

result.then(data => {
    console.log('data: ', JSON.stringify(data, '  ', 1));
}).catch(error => {
    console.log('error: ', error);
});
