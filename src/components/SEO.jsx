import { Helmet } from 'react-helmet';

const SEO = ({
  title = 'Red Sea Valley – RSV',
  description = 'Premium seaside properties in Hurghada, Sahl Hasheesh, El Gouna, and Soma Bay.',
  url = 'https://rsv.example.com'
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
  </Helmet>
);

export default SEO;
