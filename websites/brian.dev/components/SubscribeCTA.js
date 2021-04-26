export default function SubscribeCTA() {
  return (
<div className="bg-white">
<div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
  <div className="py-10 px-6 bg-indigo-700 rounded-3xl sm:py-16 sm:px-12 lg:p-20 lg:flex lg:items-center">
    <div className="lg:w-0 lg:flex-1">
      <h2 className="text-3xl font-extrabold tracking-tight text-white">Sign up for my newsletter</h2>
      <p className="mt-4 max-w-3xl text-lg text-indigo-100">
        Get weekly notifications of new articles, plus curated items of interest from around the web.
      </p>
    </div>
    <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
      <form className="sm:flex" action="https://www.getrevue.co/profile/bketelsen/add_subscriber" method="post" id="revue-form" name="revue-form"  target="_blank">
         <label htmlFor="member_email" className="sr-only">
          Email address
        </label>
        <input
          id="member_email"
          name="member[email]"
          type="email"
          autoComplete="email"
          required
          className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
          placeholder="Enter your email"
        />
        <button
          type="submit" name="member[subscribe]" id="member_submit"
          className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
        >
          Notify me
        </button>
      </form>
      <p className="mt-3 text-sm text-indigo-100">
      By subscribing, you agree with Revue’s <a target="_blank" href="https://www.getrevue.co/terms">Terms</a> and <a target="_blank" href="https://www.getrevue.co/privacy">Privacy Policy</a>.
      </p>
    </div>
  </div>
</div>
</div>
  )
}

