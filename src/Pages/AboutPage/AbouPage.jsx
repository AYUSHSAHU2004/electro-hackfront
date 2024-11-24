import React from 'react'

const AbouPage = () => {
  return (
    <div class="bg-gray-200 px-2 py-10">
    <div id="features" class="mx-auto max-w-6xl">
      <h2 class="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Learn more about us
      </h2>
      <ul class="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <img src="https://www.svgrepo.com/show/530438/ddos-protection.svg" alt="" class="mx-auto h-10 w-10"/>
          <h3 class="my-3 font-display font-medium">User Functionality</h3>
          <p class="mt-1.5 text-sm leading-6 text-secondary-500">
          Users can log in and report issues with descriptions and photos.View the status of their reports in real-time.
          </p>
        </li>
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <img src="https://www.svgrepo.com/show/530442/port-detection.svg" alt="" class="mx-auto h-10 w-10"/>
          <h3 class="my-3 font-display font-medium">Authority Management</h3>
          <p class="mt-1.5 text-sm leading-6 text-secondary-500">
          Government organizations manage reports within their assigned areas.Update the progress status of reported issues.
          </p>
        </li>
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <img src="https://www.svgrepo.com/show/530444/availability.svg" alt="" class="mx-auto h-10 w-10"/>
          <h3 class="my-3 font-display font-medium">Resolution Workflow</h3>
          <p class="mt-1.5 text-sm leading-6 text-secondary-500">
          Issues are marked resolved after user-authority agreement.Resolved reports are removed from the active list to maintain clarity.
          </p>
        </li>
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <a href="/pricing" class="group">
            <img src="https://www.svgrepo.com/show/530440/machine-vision.svg" alt="" class="mx-auto h-10 w-10"/>
            <h3 class="my-3 font-display font-medium group-hover:text-primary-500">Frontend</h3>
            <p class="mt-1.5 text-sm leading-6 text-secondary-500">
            React for building the user interface.Axios for API calls and data fetching.Integrated notification systems for updates.

            </p>
          </a>
        </li>
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <a href="/templates" class="group">
            <img src="https://www.svgrepo.com/show/530450/page-analysis.svg" alt="" class="mx-auto h-10 w-10"/>
            <h3 class="my-3 font-display font-medium group-hover:text-primary-500">Backend</h3>
            <p class="mt-1.5 text-sm leading-6 text-secondary-500">
            Node.js and Express.js for creating APIs and managing backend logic.
            </p>
          </a>
        </li>
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <a href="/download" class="group">
            <img src="https://www.svgrepo.com/show/530453/mail-reception.svg" alt="" class="mx-auto h-10 w-10"/>
            <h3 class="my-3 font-display font-medium group-hover:text-primary-500">Database</h3>
            <p class="mt-1.5 text-sm leading-6 text-secondary-500">
            MongoDB for storing structured data, using dedicated models for various components.Cloudinary for storing and managing uploaded images securely.
            </p>
          </a>
        </li>
      </ul>
    </div>
  </div>
  
  )
}

export default AbouPage