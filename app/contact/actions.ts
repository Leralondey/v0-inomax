"use server"

export async function submitContactForm(formData: FormData) {
  // Simulate form processing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    priority: formData.get("priority"),
    submittedAt: new Date().toISOString(),
  }

  console.log("Contact form submitted:", data)

  return {
    success: true,
    message: "Thank you for contacting us! We'll get back to you within 24 hours.",
  }
}

export async function scheduleConsultation(formData: FormData) {
  // Simulate consultation scheduling
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    consultationType: formData.get("consultationType"),
    preferredDate: formData.get("preferredDate"),
    preferredTime: formData.get("preferredTime"),
    timezone: formData.get("timezone"),
    message: formData.get("message"),
    scheduledAt: new Date().toISOString(),
  }

  console.log("Consultation scheduled:", data)

  return {
    success: true,
    message: "Your consultation has been scheduled! You'll receive a confirmation email shortly.",
  }
}
