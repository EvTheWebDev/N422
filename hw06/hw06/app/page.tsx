import Image from "next/image";
import "./styles.css";
import ProfileCard from "./components/ProfileCard";

export default function App() {
  return (
    <html>
      <body>
        <div>
          <main>
            <ProfileCard />
          </main>
        </div>
      </body>
    </html>
  );
}
