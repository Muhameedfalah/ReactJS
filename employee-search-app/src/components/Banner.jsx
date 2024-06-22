import BannerImage from '../assets/employees-banner.png'

const Banner = () => {
  return (
    <section>
      <div className="hero bg-base-200 py-10 lg:py-28">
        <div className="container px-4 mx-auto md:items-center flex flex-col lg:flex-row-reverse">
          <div className='flex-1'>
            <img src={BannerImage} className="w-full rounded-lg shadow-2xl" />
          </div>
          <div className='flex-1 pt-10 lg:pt-0'>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold">Meet Our Amazing Employees</h1>
            <p className="py-4 lg:py-6">A dedicated team working together to achieve great things.</p>
            <button className="btn btn-success text-white lg:text-lg lg:btn-lg">Explore Our Team</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner