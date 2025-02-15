import LikeButton from './like-button';

/*export default function Home() {
  return(
      <div>
          <h1>Hello</h1>
          <div id="test">
              <a>Cyclesphere</a>
              <a href="./app/page.tsx">App</a>
              <a>Docs</a>
              <a>Sign In</a>
          </div>
      </div>
  );
}*/

function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

    return (
        <div>
            <Header title="Develop. Preview. Ship." />
            <ul>
                {names.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
            <LikeButton />
        </div>
    );
}