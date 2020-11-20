import React, { useState } from 'react';
import Songs from './components/Songs';
import AddSong from './components/NewSong';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const [extaDivOpen, setExtradivOpen] = useState(false);
  return (
    <ApolloProvider client={client}>
      <div style={{ display: 'flex', width: '800px', justifyContent: 'space-between' }}>
        <Songs />
        <div>
          {extaDivOpen && <Songs />}
          <button onClick={() => setExtradivOpen(!extaDivOpen)}>Toggle</button>
        </div>
        <AddSong />
      </div>
    </ApolloProvider>
  );
};

export default App;
