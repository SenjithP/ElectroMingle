import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const userElectricianBookedScreen = () => {
  return (
    <>
        <section className="pb-8 flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            {loading ? (
              // Loading animation (you can replace this with your preferred loading component)
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : electriciansList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-12 md:gap-8 ">
                {electriciansList.map((electrician) => (
                  <Card
                    key={electrician.id}
                    className="p-3 mt-6 max-w-full md:max-w-[400px] lg:max-w-[300px]"
                  >
                    <CardHeader color="blue-gray" className="relative h-56">
                      <img
                        className="rounded-lg w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                        alt="card-image"
                      />
                    </CardHeader>
                    <CardBody>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex justify-between items-center m-3"
                      >
                        <span>{electrician.electricianName}</span>
                        <span>rating</span>
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex justify-between items-center m-3"
                      >
                        <span>
                          ₹ {electrician.electricianWage.electricianWagePerDay}
                        </span>
                        <span className="flex gap-2 items-center first-letter">
                          <GrLocation />
                          {electrician.electricianLocation.electricianLocality},
                          {electrician.electricianLocation.electricianState}
                        </span>
                      </Typography>
                      <Typography className="text-justify">
                        {electrician.electricianDescription}
                      </Typography>
                    </CardBody>
                    <CardFooter className="flex gap-7 justify-center pt-5">
                      <Button className="bg-buttonColor pl-3 pr-3">
                        <Link to={`/electricianDetails/${electrician._id}`}>
                          Schedule
                        </Link>
                      </Button>

                      <Button className="bg-buttonColor pl-3 pr-3">
                        Chat with
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div>No electricians found</div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default userElectricianBookedScreen