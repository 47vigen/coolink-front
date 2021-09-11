import React from 'react'
import Button from '../../Tools/Button'
import Icon from '../../Tools/Icon'

function Footer(props) {
  return (
    <footer className="container max-w-screen-xl mx-auto border-t border-line py-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center space-y-3">
        <img className="w-40 " src="/images/footer-logo.svg" alt="footer-logo" />
        <p className="text-center">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط
        </p>
        <div className="space-s-2">
          <Button circle>
            <Icon name="instagram" />
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
