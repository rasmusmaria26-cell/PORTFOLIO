import React, { useState, useEffect } from 'react'
import { MotionFooter } from '@/components/ui/motion-footer'

export default function Footer() {
  // Desktop: cinematic footer. Mobile: standard footer (no fixed positioning)
  return <MotionFooter />
}
