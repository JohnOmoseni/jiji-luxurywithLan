import ListHotel from "@/components/forms/ads/ListHostel";

function CreateHotel() {
  return (
    <div>
      <h2>Create Hotel</h2>
      <div className="max-w-6xl mx-auto">
        <ListHotel type="post" />
      </div>
    </div>
  );
}

export default CreateHotel;
