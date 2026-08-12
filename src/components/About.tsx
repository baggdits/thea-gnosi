type AboutData = {
  title: string;
  content: string;
  image: string;
};

type AboutProps = {
  data: AboutData;
};

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="about">
      <div className="about-content">
        <h2>{data.title}</h2>

        {data.content && (
          <div
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          />
        )}
      </div>

      {data.image && (
        <div className="about-image">
          <img
            src={data.image}
            alt={data.title}
          />
        </div>
      )}
    </section>
  );
}