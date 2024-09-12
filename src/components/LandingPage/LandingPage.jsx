import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import Card from './Card';
import Header from './Header/Header';


function LandingPage() {
  return (
    <div className="text-gray-800">
      {/* Header */}
    

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between container mx-auto px-6 py-10 mt-6 bg-white">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Ease the Public's Commute:</h1>
          <p className="text-lg lg:text-xl mb-6">In our fast-paced world, finding efficient and reliable transportation has become a crucial aspect of daily life.</p>
          {/* <a href="#" className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">Get Started</a> */}
          <Link to='/map'>
            <button className='text-white bg-blue-600 font-semibold rounded px-8 py-2 hover:bg-blue-700 hover:scale-[0.9] duration-200'>
              Explore Map
            </button>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-end">
          <img src="busRoad.png" alt="App Screenshot" className="w-[75%] rounded-lg shadow-md" />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Features</h2>

        <div className="flex flex-col lg:flex-row justify-around space-y-12 lg:space-y-0 lg:space-x-12">

          <ScrollAnimation animateIn="fadeIn" duration={1.5}>
            {/* <Card
              header="Real-Time Tracking"
              para="Track the live position of buses and trains and stay updated with real-time data"
              imgSrc="https://www.researchgate.net/profile/Amirah-Aisha/publication/325492689/figure/fig1/AS:948717075046401@1603203185516/Diagram-of-real-time-on-Campus-Public-Transportation-Monitoring-System.jpg"
            /> */}
            <div className='flex flex-col items-center p-6 rounded-lg shadow-lg'>
              <img src="https://cms.trackon-gps.com/media/reasons/trackon-bus-1.webp" alt="" />
              <h1 className='text-lg font-semibold'>Real-Time Tracking</h1>
              <p>Track the live position of buses and trains and stay updated with real-time data</p>
            </div>
          </ScrollAnimation>



          <ScrollAnimation animateIn="fadeIn" duration={1.5} delay={200}>
            <div className='flex flex-col items-center p-6 rounded-lg shadow-lg'>
              <img src="https://img.freepik.com/premium-vector/people-waiting-bus-stop-female-male-passengers-sitting-modern-station-man-standing-near-route-map_102902-7345.jpg?ga=GA1.2.284706500.1718984879&semt=ais_hybrid" alt="" />
              <h1 className='text-lg font-semibold'>Estimated Arrival</h1>
              <p>Never miss a bus or train. Get accurate ETA and plan your journey better</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeIn" duration={1.5} delay={200}>
            <div className='flex flex-col items-center p-6 rounded-lg shadow-lg'>
              <img src="https://img.freepik.com/free-vector/parents-looking-school-bus-location-pin-map-tablet-child-tracking-system-school-bus-route-child-safety-security-concious-parents-concept-vector-isolated-illustration_335657-1985.jpg?ga=GA1.2.284706500.1718984879&semt=ais_hybrid" alt="" />
              <h1 className='text-lg font-semibold'>Route Planning</h1>
              <p>Navigate your route with ease using our intuitive interface</p>
            </div>
          </ScrollAnimation>


        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20 bg-blue-50 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <ScrollAnimation animateIn="fadeInUp" duration={1.5}>
            <div className="bg-white rounded-lg shadow-lg p-8 h-72">
              <div className="mb-4">
                <img src="https://img.freepik.com/premium-vector/people-auto-station-man-woman-standing-near-transport-waiting_625536-4298.jpg?ga=GA1.1.284706500.1718984879&semt=ais_hybrid" alt="Benefit 1" className="mx-auto w-20 h-20 object-cover" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Convenience</h3>
              <p>Access all transportation options in one place, ensuring you always have the best route at your fingertips.</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeInUp" duration={1.5} delay={200}>
            <div className="bg-white rounded-lg shadow-lg p-8  h-72">
              <div className="mb-4">
                <img src="https://cms.trackon-gps.com/media/reasons/trackon-bus-2.webp" alt="Benefit 2" className="mx-auto w-20 h-20 object-cover" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Convenient and cost-effective</h3>
              <p>No additional equipment needed—access all features directly from your mobile device</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeInUp" duration={1.5} delay={400}>
            <div className="bg-white rounded-lg shadow-lg p-8 h-72">
              <div className="mb-4">
                <img src="https://img.freepik.com/premium-vector/school-bus-tracking-system-abstract-concept-vector-illustration_107173-25549.jpg?ga=GA1.1.284706500.1718984879&semt=ais_hybrid" alt="Benefit 3" className="mx-auto w-20 h-20 object-cover" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Reliability</h3>
              <p>Count on our real-time updates and accurate schedules to get you to your destination on time.</p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Mid Section */}
      <section className="container mx-auto px-6 py-20 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-8">Revolutionize Public Transportation</h2>
        <p className="text-lg lg:text-xl mb-8">Innovating the commuting experience for you. Stay connected and stay ahead with our intuitive platform.</p>
        <img src="https://img.freepik.com/free-vector/people-getting-bus-concept-illustration_114360-21778.jpg?ga=GA1.1.284706500.1718984879&semt=ais_hybrid" alt="Public Transportation Image" className="w-full max-w-lg mx-auto rounded-lg shadow-md" />
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          &copy; 2024NavigateTheCity. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
