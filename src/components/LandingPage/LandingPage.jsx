import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Card from './Card';
import Header from './Header/Header';


function LandingPage() {
  return (
    <div className="text-gray-800">
      {/* Header */}
    

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between container mx-auto px-6 py-20 mt-20 bg-white">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Ease the Public's Commute:</h1>
          <p className="text-lg lg:text-xl mb-6">In our fast-paced world, finding efficient and reliable transportation has become a crucial aspect of daily life.</p>
          <a href="#" className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">Get Started</a>
        </div>
        <div className="lg:w-1/2 flex justify-end">
          <img src="busRoad.png" alt="App Screenshot" className="w-[75%] rounded-lg shadow-md" />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Features</h2>

        <div className="flex flex-col lg:flex-row justify-around space-y-12 lg:space-y-0 lg:space-x-12">

          <ScrollAnimation animateIn="fadeIn" duration={1.5}>
            <Card
              header="Real-Time Tracking"
              para="Track the live position of buses and trains and stay updated with real-time data"
              imgSrc="https://via.placeholder.com/300x200"
            />
          </ScrollAnimation>



          <ScrollAnimation animateIn="fadeIn" duration={1.5} delay={200}>
            <Card
              header="Estimated Arrival"
              para="Never miss a bus or train. Get accurate ETA and plan your journey better."
              imgSrc="https://via.placeholder.com/300x200"
            />
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeIn" duration={1.5} delay={200}>
            <Card
              header="Route Planning"
              para="Navigate your route with ease using our intuitive interface"
              imgSrc="https://via.placeholder.com/300x200"
            />
          </ScrollAnimation>


        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20 bg-blue-50 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <ScrollAnimation animateIn="fadeInUp" duration={1.5}>
            <div className="bg-white rounded-lg shadow-lg p-8 h-72">
              <div className="mb-6">
                <img src="https://via.placeholder.com/80" alt="Benefit 1" className="mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Convenience</h3>
              <p>Access all transportation options in one place, ensuring you always have the best route at your fingertips.</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeInUp" duration={1.5} delay={200}>
            <div className="bg-white rounded-lg shadow-lg p-8  h-72">
              <div className="mb-6">
                <img src="https://via.placeholder.com/80" alt="Benefit 2" className="mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Convenient and cost-effective</h3>
              <p>No additional equipment needed—access all features directly from your mobile device</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeInUp" duration={1.5} delay={400}>
            <div className="bg-white rounded-lg shadow-lg p-8 h-72">
              <div className="mb-6">
                <img src="https://via.placeholder.com/80" alt="Benefit 3" className="mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Reliability</h3>
              <p>Count on our real-time updates and accurate schedules to get you to your destination on time.</p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Mid Section */}
      <section className="container mx-auto px-6 py-20 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-8">Revolutionize Public Transportation</h2>
        <p className="text-lg lg:text-xl mb-8">Innovating the commuting experience for you. Stay connected and stay ahead with our intuitive platform.</p>
        <img src="https://via.placeholder.com/500x300" alt="Public Transportation Image" className="w-full max-w-lg mx-auto rounded-lg shadow-md" />
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
