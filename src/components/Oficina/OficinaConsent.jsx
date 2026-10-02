import { useEffect, useState } from "react";
import { initializeAnalytics } from "../../utils/analytics";
import { initializeMetaPixel } from "../../utils/metaPixel";
import styles from "../../pages/RonasOficinaPage.module.css";

const consentKey = "ronas_oficina_optional_analytics";
const configured = Boolean(
  import.meta.env.VITE_GA_MEASUREMENT_ID ||
  import.meta.env.VITE_GOOGLE_ADS_ID ||
  import.meta.env.VITE_META_PIXEL_ID,
);
export default function OficinaConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!configured) return;
    let choice;
    try {
      choice = localStorage.getItem(consentKey);
    } catch {
      /* Keep optional tools off. */
    }
    if (choice === "accepted") {
      initializeAnalytics();
      initializeMetaPixel();
    } else if (choice !== "rejected") setVisible(true);
  }, []);
  function choose(choice) {
    try {
      localStorage.setItem(consentKey, choice);
    } catch {
      /* Choice applies to this page view. */
    }
    if (choice === "accepted") {
      initializeAnalytics();
      initializeMetaPixel();
    }
    setVisible(false);
  }
  if (!visible) return null;
  return (
    <aside className={styles.consent} aria-label="Sua escolha de privacidade">
      <p>
        Podemos usar análise e publicidade opcionais para entender as visitas?{" "}
        <a href="/politica-de-privacidade">Saiba mais</a>.
      </p>
      <div>
        <button onClick={() => choose("rejected")}>
          Continuar sem aceitar
        </button>
        <button onClick={() => choose("accepted")}>Aceitar</button>
      </div>
    </aside>
  );
}
