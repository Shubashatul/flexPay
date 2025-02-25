import Nav from "./Nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 via-green-500 to-green-800">
      {/* Navigation Bar */}
      <Nav />

      {/* Main Content Section */}
      <div className="flex flex-col items-center py-16 text-center text-white">
        {/* Welcome Section */}
        <h2 className="text-4xl font-extrabold mb-6">
          Welcome to Flex-Pay
        </h2>
        <p className="text-xl mb-8">
          Your financial journey starts here. Manage your money, make transfers, and track your expenses easily.
        </p>

        {/* Image */}
        <img
          src="../assets/iconF.png"  
          alt="Flex-pay"
          className="mb-8 rounded-lg shadow-lg"
        />

        {/* Features Section */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Secure Transactions</h3>
            <p className="text-gray-700">
              Experience the safest way to send and receive money, all backed by top-notch security protocols.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Real-Time Balance</h3>
            <p className="text-gray-700">
              Always know where you stand with our real-time balance tracker. Stay on top of your finances!
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Easy Transfers</h3>
            <p className="text-gray-700">
              Send money to friends, family, or businesses with just a few clicks. Fast, reliable, and easy.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to take control of your finances?
          </h3>
          <p className="text-lg mb-6 text-white">
            Join thousands of happy customers who trust us to manage their money every day.
          </p>
          <a
            href="/Signup"
            className="bg-white text-green-700 py-2 px-6 rounded-full text-lg font-semibold hover:bg-green-100 transition-colors duration-300"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p className="text-sm">&copy; 2025 Flex-Pay. All rights reserved.</p>
        <p className="text-sm mt-2">Created by Raj Kumar Pandey</p>
        <p className="text-sm mt-1">Email: <a href="mailto:rpandeya12345@gmail.com" className="underline">rpandeya12345@gmail.com</a></p>
      </footer>
    </div>
  );
}
