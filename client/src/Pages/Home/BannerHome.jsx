const BannerHome = () => {
  return (
    <div
      style={{
        background:
          'url("https://i.ibb.co/RckJNw8/pexels-max-rahubovskiy-7031406.jpg") center/cover no-repeat',
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
        <div>
        <h1 style={{ fontSize: "3em", marginBottom: "20px" }}>
          Find Your Dream Home
        </h1>
        <p style={{ fontSize: "1.2em" }}>
          Explore our curated selection of rental properties. Your perfect home
          is just a click away.
        </p>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1.2em",
            background: "orange",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          View Listings
        </button>
        </div>
      </div>
      
    </div>
  );
};

export default BannerHome;
