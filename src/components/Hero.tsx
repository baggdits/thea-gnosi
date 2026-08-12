type HeroData = {
  title: string;
  description: string;
  button_text: string;
  button_url: string;
  image: string;
};

type HeroProps = {
  data: HeroData;
};

export default function Hero({ data }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{data.title}</h1>

        {data.description && (
          <p>{data.description}</p>
        )}

        {data.button_text && (
          <a href={data.button_url}>
            {data.button_text}
          </a>
        )}
      </div>

      {data.image && (
        <div className="hero-image">
          <img
            src={data.image}
            alt={data.title}
          />
        </div>
      )}
    </section>
  );
}