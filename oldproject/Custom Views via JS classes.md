# Custom Views via JS classes

For advanced developers, FullCalendar provides an API for building custom views with the unlimited flexibility of JavaScript code. Using OOP programming principals, one can subclass the base View class, implementing or overriding each specific behavior as a method, and then registering the new class with FullCalendar, like so:

```javascript
var FC = $.fullCalendar; // a reference to FullCalendar's root namespace
var View = FC.View;      // the class that all views must inherit from
var CustomView;          // our subclass

CustomView = View.extend({ // make a subclass of View

  initialize: function() {
    // called once when the view is instantiated, when the user switches to the view.
    // initialize member variables or do other setup tasks.
  },

  render: function() {
    // responsible for displaying the skeleton of the view within the already-defined
    // this.el, a jQuery element.
    // 应该与 renderSkeleton 类似
  },

  setHeight: function(height, isAuto) {
    // responsible for adjusting the pixel-height of the view. if isAuto is true, the
    // view may be its natural height, and `height` becomes merely a suggestion.
  },

  renderEvents: function(events) {
    // reponsible for rendering the given Event Objects
  },

  destroyEvents: function() {
    // responsible for undoing everything in renderEvents
  },

  renderSelection: function(range) {
    // accepts a {start,end} object made of Moments, and must render the selection
  },

  destroySelection: function() {
    // responsible for undoing everything in renderSelection
  }

});

FC.views.custom = CustomView; // register our class with the view system

```

The View class provides many other methods that can be overridden or leveraged. See the View class’ source for more insight. It might be wise to watch the project on GitHub in case the API for any of the more advanced non-standard methods changes.

When overriding an advanced method, it is always a good idea to call its super-method, the method that the View super-class defines:

```javascript
CustomView = View.extend({

  // clears the view's rendering and executes other cleanup tasks
  destroy: function() {

    // <your custom cleanup-code here>

    // call the super-class's method, forwarding all arguments
    View.prototype.destroy.apply(this, arguments);
  }

});
```

The above documentation is helpful for building a barebones view, but making it full-featured and interactive is a further challenging. A robust view should be right-to-left compatible, locale-customizable, allow event dragging and resizing, allow user selections, and more…

Making a full-featured view is beyond the scope of this document. Further documentation should be written and further APIs should be formalized, but for now, it would be best to browse FullCalendar’s source on GitHub. Pay attention to how BasicView and AgendaView are implemented.