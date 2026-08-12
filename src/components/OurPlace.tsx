type OurPlaceData = {
  title: string;
  description: string;
  image: string;
  button_text: string;
  button_url: string;
};

type OurPlaceProps = {
  data: OurPlaceData;
};

export default function OurPlace({ data }: OurPlaceProps) {
  return (
    <section id="our-place" className="our-place">
      <div className="our-place-content">
        <h2>{data.title}</h2>

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
        <div className="our-place-image">
          <img
            src={data.image}
            alt={data.title}
          />
        </div>
      )}
    </section>
  );
}